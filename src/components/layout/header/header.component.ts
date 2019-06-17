import { Component, Inject, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { AppConfig } from 'src/app-config';
import { LoginComponent } from 'src/components/login/login.component';
import { RegistrationComponent } from 'src/components/registration/registration.component';
import { RestoreRequestComponent } from 'src/components/restore/restore-request/restore-request.component';
import { MeManager } from 'src/managers/me.manager';
import { IUsersService, users_service } from 'src/services/users/interface';

@Component({
  selector: 'moo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() haveMessages = false;

  constructor(@Inject(users_service) private usersService: IUsersService,
              private config: AppConfig,
              private modalService: NzModalService,
              public me: MeManager) {
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
      if (component instanceof LoginComponent) {
        component.logged.subscribe(() => modal.close());
      } else if (component instanceof RegistrationComponent) {
        component.registered.subscribe(() => modal.close());
      }
    });
  }

  logout() {
    this.usersService.logout().subscribe(() => this.config.authorization = null);
  }

  login() {
    this.openModal(LoginComponent);
  }

  restore() {
    this.openModal(RestoreRequestComponent);
  }

  registration() {
    this.openModal(RegistrationComponent);
  }
}
