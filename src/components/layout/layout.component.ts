import { Component } from '@angular/core';
import { MeManager } from 'src/managers/me.manager';

@Component({
  selector: 'moo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isCollapsed = false;

  constructor(public me: MeManager) {

  }
}
