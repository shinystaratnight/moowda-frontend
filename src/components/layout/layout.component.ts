import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { debounceTime, filter, pairwise } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { PLATFORM_DELAY } from 'src/consts';
import { MeManager } from 'src/managers/me.manager';
import { ScrollManager } from 'src/managers/scroll.manager';
import { LoginComponent } from '../login/login.component';
import { CreateTopicComponent } from '../topics/create-topic/create-topic.component';

@Component({
  selector: 'moo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  collapsed = false;
  haveMessages = false;
  extended = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public config: AppConfig,
              private modalService: NzModalService,
              private scroll: ScrollManager,
              public me: MeManager) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && this.config.device.mobile)
    ).subscribe(() => this.collapsed = true);
  }

  ngAfterViewInit() {
    this.scroll.position$.pipe(
      pairwise(),
      filter(() => this.config.device.mobile)
    ).subscribe(([start, end]) => {
      this.extended = !!start && end > start;
    });
  }

  private openModal(content: any) {
    this.modalService.closeAll();
    const modal = this.modalService.create({
      nzTitle: '',
      nzContent: content,
      nzFooter: null,
      nzWidth: 'fit-content'
    });

    modal.afterOpen.subscribe(() => {
      const component = modal.getContentComponent();
      if (component instanceof CreateTopicComponent) {
        component.created.subscribe(topic => {
          modal.close();
          this.router.navigate(['..', topic.id], {relativeTo: this.route});
        });
      } else if (component instanceof LoginComponent) {
        component.logged.pipe(debounceTime(PLATFORM_DELAY))
          .subscribe(() => {
            modal.close();
            this.create();
          });
      }
    });
  }

  create() {
    this.openModal(this.me.logged ? CreateTopicComponent : LoginComponent);
  }
}
