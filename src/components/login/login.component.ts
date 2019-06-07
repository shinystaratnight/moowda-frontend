import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validate } from 'junte-angular';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { finalize } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { RegistrationComponent } from 'src/components/registration/registration.component';
import { LoginCredentials } from 'src/models/user-credentials';
import { IUsersService, users_service } from 'src/services/users/interface';

@Component({
  selector: 'moo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private _modal: NzModalRef;

  set modal(modal: NzModalRef) {
    this._modal = modal;

    modal.afterOpen.subscribe(() => {
      const component = modal.getContentComponent();
      if (component instanceof RegistrationComponent) {
        component.registered.subscribe(() => this.modal.close());
      }
    });
  }

  get modal() {
    return this._modal;
  }

  loading: boolean;
  error: Error;

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

  login() {
    if (validate(this.loginForm)) {
      this.loading = true;
      this.usersService.login(new LoginCredentials(this.loginForm.value))
        .pipe(finalize(() => this.loading = false))
        .subscribe(authorization => {
            this.config.authorization = authorization;
            this.logged.emit();
          },
          error => this.error = error);
    }
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
