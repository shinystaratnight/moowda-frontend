import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { AppConfig } from 'src/app-config';
import { LoginComponent } from 'src/components/login/login.component';

@Component({
  selector: 'moo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _modal: NzModalRef;

  set modal(modal: NzModalRef) {
    this._modal = modal;

    modal.afterOpen.subscribe(() => {
      const component = modal.getContentComponent();
      component.logged.subscribe(() => this.modal.close());
    });
  }

  get modal() {
    return this._modal;
  }

  constructor(private modalService: NzModalService,
              private config: AppConfig) {
  }

  ngOnInit() {
    if (!this.config.authorization) {
      // setTimeout needed for avoid error from modal service
      setTimeout(() => {
        this.modal = this.modalService.create({
          nzTitle: '',
          nzContent: LoginComponent,
          nzFooter: null,
          nzWidth: 'fit-content'
        });
      });
    }
  }
}
