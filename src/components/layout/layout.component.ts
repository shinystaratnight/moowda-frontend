import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {debounceTime, filter, pairwise, throttleTime} from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { PLATFORM_DELAY } from 'src/consts';
import { MeManager } from 'src/managers/me.manager';
import {CreateTopicComponent} from "../topics/create-topic/create-topic.component";
import {LoginComponent} from "../login/login.component";
import {NzModalService} from "ng-zorro-antd";

const SCROLL_OFFSET = 100;
const SCROLL_DELAY = 1000;

@Component({
  selector: 'moo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  private position$ = new BehaviorSubject<number>(0);
  collapsed = false;
  haveMessages = false;
  hide = false;

  set position(position: number) {
    this.position$.next(position);
  }

  get position() {
    return this.position$.getValue();
  }

  @HostListener('window:scroll', [])
  scrolled() {
    const mod = Math.abs(window.pageYOffset - this.position) > SCROLL_OFFSET;
    if (mod && this.config.device.mobile) {
      this.position = window.pageYOffset;
    }
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              public config: AppConfig,
              private modalService: NzModalService,
              public me: MeManager) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && this.config.device.mobile)
    ).subscribe(() => this.collapsed = true);

    this.position$.pipe(pairwise(), throttleTime(SCROLL_DELAY))
      .subscribe(([start, end]) => {
        this.hide = !!start && end > start;
      });
  }

  private openModal(component: any) {
    this.modalService.closeAll();
    const modal = this.modalService.create({
      nzTitle: '',
      nzContent: component,
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
