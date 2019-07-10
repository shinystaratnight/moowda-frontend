import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SignalsService } from 'junte-angular';
import { NzModalService } from 'ng-zorro-antd';
import { debounceTime, filter } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { PLATFORM_DELAY } from 'src/consts';
import { MeManager } from 'src/managers/me.manager';
import { ScrollManager } from 'src/managers/scroll.manager';
import { CollapsedSignal } from 'src/models/signal';
import { LoginComponent } from '../login/login.component';
import { CreateTopicComponent } from '../topics/create-topic/create-topic.component';

const SCROLL_OFFSET = 60;

@Component({
  selector: 'moo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  private position = 0;
  collapsed = false;
  haveMessages = false;
  extended = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: NzModalService,
              private scroll: ScrollManager,
              private signal: SignalsService,
              public config: AppConfig,
              public me: MeManager) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && this.config.device.mobile)
    ).subscribe(() => this.signal.signal(new CollapsedSignal(true)));

    this.signal.signals$.pipe(filter(signal => signal instanceof CollapsedSignal))
      .subscribe((signal: CollapsedSignal) => this.collapsed = signal.collapsed);
  }

  ngAfterViewInit() {
    this.scroll.position$.pipe(
      filter(() => this.config.device.mobile)
    ).subscribe(pos => {
      if (Math.abs(pos - this.position) > SCROLL_OFFSET) {
        this.extended = !!this.position && (pos - this.position) > SCROLL_OFFSET;
        this.position = pos;
      }
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

      switch (component.constructor.name) {
        case 'CreateTopicComponent': {
          (component as CreateTopicComponent).created.subscribe(topic => {
            modal.close();
            this.router.navigate(['/chat/topics', topic.id], {relativeTo: this.route});
          });
          break;
        }
        case 'LoginComponent': {
          (component as LoginComponent).logged.pipe(debounceTime(PLATFORM_DELAY)).subscribe(() => {
            modal.close();
            this.create();
          });
          break;
        }
      }
    });
  }

  create() {
    this.openModal(this.me.logged ? CreateTopicComponent : LoginComponent);
  }
}
