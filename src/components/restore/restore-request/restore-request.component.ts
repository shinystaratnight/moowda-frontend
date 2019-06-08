import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validate } from 'junte-angular';
import { finalize } from 'rxjs/operators';
import { RestoreRequestCredentials } from 'src/models/user-credentials';
import { IUsersService, users_service } from 'src/services/users/interface';

@Component({
  selector: 'moo-restore-request',
  templateUrl: './restore-request.component.html',
  styleUrls: ['./restore-request.component.scss']
})
export class RestoreRequestComponent {

  loading: boolean;

  restoreForm: FormGroup = this.builder.group({
    email: [null, [Validators.required]]
  });

  @Output() requested = new EventEmitter<any>();

  constructor(@Inject(users_service) protected usersService: IUsersService,
              private builder: FormBuilder) {
  }

  restore() {
    if (validate(this.restoreForm)) {
      this.loading = true;
      this.usersService.restoreRequest(new RestoreRequestCredentials(this.restoreForm.value))
        .pipe(finalize(() => this.loading = false))
        .subscribe(() => this.requested.emit());
    }
  }

}
