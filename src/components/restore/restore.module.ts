import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RestorePasswordComponent } from 'src/components/restore/restore-password/restore-password.component';
import { RestoreRequestComponent } from './restore-request/restore-request.component';
import { RestoreComponent } from './restore.component';

@NgModule({
  declarations: [
    RestorePasswordComponent,
    RestoreRequestComponent,
    RestoreComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  entryComponents: [
    RestorePasswordComponent,
    RestoreRequestComponent
  ],
  exports: [
    RestorePasswordComponent,
    RestoreRequestComponent,
    RestoreComponent
  ]
})
export class RestoreModule {
}
