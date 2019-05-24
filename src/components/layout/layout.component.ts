import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute,
              private config: AppConfig,
              public me: MeManager) {
  }

  ngOnInit() {
    this.route.params.pipe(filter(({topic}) => !!+topic && this.config.device.mobile))
      .subscribe(() => this.collapsed = true);
  }
}
