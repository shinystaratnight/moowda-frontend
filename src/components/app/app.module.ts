import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Config, HttpMockService, HttpService, SignalsService} from 'junte-angular';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';
import { AppConfig } from 'src/app-config';

import { AppRoutingModule } from 'src/components/app/app-routing.module';
import { AppComponent } from 'src/components/app/app.component';
import { LayoutModule } from 'src/components/layout/layout.module';
import { LoginModule } from 'src/components/login/login.module';
import { OutletModule } from 'src/components/outlet/outlet.module';
import { RegistrationModule } from 'src/components/registration/registration.module';
import { RestoreModule } from 'src/components/restore/restore.module';
import { AppHttpService } from 'src/services/http.service';
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
    RegistrationModule,
    RestoreModule,
    OutletModule
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
    {
      provide: HttpService,
      useExisting: AppHttpService
    },
    HttpClient,
    HttpMockService,
    UsersServiceProvider,
    MeServiceProvider,
    MessagesSocketService,
    TopicsSocketService,
    SignalsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
