import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { MeManager } from 'src/managers/me.manager';

@Component({
  selector: 'moo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  collapsed = false;
  haveMessages = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private config: AppConfig,
              public me: MeManager) {
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd && this.config.device.mobile))
      .subscribe(() => this.collapsed = true);
  }
}
