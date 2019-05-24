import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { MeManager } from 'src/managers/me.manager';

@Component({
  selector: 'moo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isCollapsed = false;
  topic: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private config: AppConfig,
              public me: MeManager) {
  }

  ngOnInit() {
    this.route.params.pipe(filter(({topic}) => !!topic && this.topic !== topic))
      .subscribe(({topic}) => {
        this.topic = +topic || null;
        console.log(this.config.device.mobile);
        if (this.config.device.mobile) {
          this.isCollapsed = true;
        }
      });
  }
}
