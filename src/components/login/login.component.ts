import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validate } from 'junte-angular';
import { NzModalService } from 'ng-zorro-antd';
import { finalize } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { RegistrationComponent } from 'src/components/registration/registration.component';
import { RestoreRequestComponent } from 'src/components/restore/restore-request/restore-request.component';
import { LoginCredentials } from 'src/models/user-credentials';
import { IUsersService, users_service } from 'src/services/users/interface';

@Component({
  selector: 'moo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading: boolean;

  loginForm: FormGroup = this.builder.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  @Output() logged = new EventEmitter<any>();

  constructor(@Inject(users_service) protected usersService: IUsersService,
              private modalService: NzModalService,
              private builder: FormBuilder,
              private config: AppConfig) {
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
      if (component instanceof RegistrationComponent) {
        component.registered.subscribe(() => modal.close());
      } else if (component instanceof RestoreRequestComponent) {
        component.requested.subscribe(() => modal.close());
      }
    });
  }

  login() {
    if (validate(this.loginForm)) {
      this.loading = true;
      this.usersService.login(new LoginCredentials(this.loginForm.value))
        .pipe(finalize(() => this.loading = false))
        .subscribe(authorization => {
          this.config.authorization = authorization;
          this.logged.emit();
        });
    }
  }

  restore() {
    this.openModal(RestoreRequestComponent);
  }

  registration() {
    this.openModal(RegistrationComponent);
  }
}
