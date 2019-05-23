import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeManager } from 'src/managers/me.manager';

@Component({
  selector: 'moo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  isCollapsed = false;

  constructor(public me: MeManager,
              private router: Router,
              private route: ActivatedRoute) {
  }

  go(topic: number) {
    this.router.navigate(['/topics', topic], {relativeTo: this.route});
  }
}
