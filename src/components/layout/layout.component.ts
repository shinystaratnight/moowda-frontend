import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, pairwise, throttleTime } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { MeManager } from 'src/managers/me.manager';

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
              private config: AppConfig,
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
}
