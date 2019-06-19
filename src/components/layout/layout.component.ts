import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {debounceTime, filter, pairwise, throttleTime} from 'rxjs/operators';
import {AppConfig} from 'src/app-config';
import {PLATFORM_DELAY} from 'src/consts';
import {MeManager} from 'src/managers/me.manager';
import {CreateTopicComponent} from "../topics/create-topic/create-topic.component";
import {LoginComponent} from "../login/login.component";
import {NzModalService} from "ng-zorro-antd";
import {ScrollManager} from "../../managers/scroll.manager";

const SCROLL_DELAY = 1000;

@Component({
  selector: 'moo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  collapsed = false;
  haveMessages = false;
  extend = false;

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
      throttleTime(SCROLL_DELAY),
      filter(() => this.config.device.mobile)
    ).subscribe(([start, end]) => this.extend = !!start && end > start);
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
