import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validate } from 'junte-angular';
import { finalize } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { RegistrationCredentials } from 'src/models/user-credentials';
import { IUsersService, users_service } from 'src/services/users/interface';

@Component({
  selector: 'moo-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  loading: boolean;
  error: Error;

  registerForm: FormGroup = this.builder.group({
    email: [null, [Validators.required]],
    username: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  @Output() registered = new EventEmitter<any>();

  constructor(@Inject(users_service) protected usersService: IUsersService,
              private builder: FormBuilder,
              private config: AppConfig) {
  }

  register() {
    if (validate(this.registerForm)) {
      this.loading = true;
      this.usersService.registration(new RegistrationCredentials(this.registerForm.value))
        .pipe(finalize(() => this.loading = false))
        .subscribe(authorization => {
            this.config.authorization = authorization;
            this.registered.emit();
          },
          error => this.error = error);
    }
  }
}
