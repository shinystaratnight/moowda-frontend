import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { AppConfig } from 'src/app-config';
import { LoginComponent } from 'src/components/login/login.component';
import { RegistrationComponent } from 'src/components/registration/registration.component';
import { CreateTopicComponent } from 'src/components/topics/create-topic/create-topic.component';
import { MeManager } from 'src/managers/me.manager';
import { IUsersService, users_service } from 'src/services/users/interface';

@Component({
  selector: 'moo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private _modal: NzModalRef;

  set modal(modal: NzModalRef) {
    this._modal = modal;

    modal.afterOpen.subscribe(() => {
      const component = modal.getContentComponent();
      if (component instanceof LoginComponent) {
        component.logged.subscribe(() => this.modal.close());
      } else if (component instanceof RegistrationComponent) {
        component.registered.subscribe(() => this.modal.close());
      } else if (component instanceof CreateTopicComponent) {
        component.created.subscribe(() => this.modal.close());
      }
    });
  }

  get modal() {
    return this._modal;
  }

  @Input() collapsed: boolean;
  @Output() collapsedChange = new EventEmitter<boolean>();

  constructor(@Inject(users_service) private usersService: IUsersService,
              private config: AppConfig,
              private modalService: NzModalService,
              public me: MeManager) {
  }

  logout() {
    this.usersService.logout().subscribe(() => this.config.authorization = null);
  }

  login() {
    this.modalService.closeAll();
    this.modal = this.modalService.create({
      nzTitle: '',
      nzContent: LoginComponent,
      nzFooter: null,
      nzWidth: 'fit-content'
    });
  }

  restore() {

  }

  registration() {
    this.modalService.closeAll();
    this.modal = this.modalService.create({
      nzTitle: '',
      nzContent: RegistrationComponent,
      nzFooter: null,
      nzWidth: 'fit-content'
    });
  }
}
