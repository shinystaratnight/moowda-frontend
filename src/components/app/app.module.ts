import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Config, HttpMockService, HttpService } from 'junte-angular';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';
import { AppConfig } from 'src/app-config';

import { AppRoutingModule } from 'src/components/app/app-routing.module';
import { AppComponent } from 'src/components/app/app.component';
import { LayoutModule } from 'src/components/layout/layout.module';
import { LoginModule } from 'src/components/login/login.module';
import { RegistrationModule } from 'src/components/registration/registration.module';
import { MeServiceProvider } from 'src/services/me/me.provider';
import { MessagesSocketService } from 'src/services/messages/socket';
import { TopicsSocketService } from 'src/services/topics/socket';
import { UsersServiceProvider } from 'src/services/users/provider';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    LayoutModule,
    LoginModule,
    RegistrationModule
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US
    },
    {
      provide: Config,
      useExisting: AppConfig
    },
    HttpClient,
    HttpService,
    HttpMockService,
    UsersServiceProvider,
    MeServiceProvider,
    MessagesSocketService,
    TopicsSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
