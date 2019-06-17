import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validate } from 'junte-angular';
import { finalize } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { RestorePasswordCredentials } from 'src/models/user-credentials';
import { IUsersService, users_service } from 'src/services/users/interface';

@Component({
  selector: 'moo-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent {

  loading: boolean;

  restoreForm: FormGroup = this.builder.group({
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required, this.passwordConfirming.bind(this)]]
  });

  @Input() hash: string;

  @Output() restored = new EventEmitter<any>();

  constructor(@Inject(users_service) protected usersService: IUsersService,
              private builder: FormBuilder,
              private config: AppConfig) {
  }

  passwordConfirming(control: AbstractControl): { invalid: boolean } {
    return {invalid: !this.restoreForm || control.value !== this.restoreForm.get('password').value};
  }

  restore() {
    if (validate(this.restoreForm)) {
      this.loading = true;
      this.usersService.restorePassword(new RestorePasswordCredentials({
        password: this.restoreForm.get('password').value,
        hash: this.hash
      })).pipe(finalize(() => this.loading = false))
        .subscribe(authorization => {
          this.restored.emit();
          this.config.authorization = authorization;
        });
    }
  }

}
