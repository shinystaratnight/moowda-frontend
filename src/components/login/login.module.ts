import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  entryComponents: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {
}
