import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RegistrationComponent } from './registration.component';

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  entryComponents: [
    RegistrationComponent
  ],
  exports: [
    RegistrationComponent
  ]
})
export class RegistrationModule {
}
