import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Config, HttpMockService, HttpService } from "junte-angular";
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';
import { AppConfig } from "src/app-config";

import { AppRoutingModule } from 'src/components/app/app-routing.module';
import { AppComponent } from 'src/components/app/app.component';
import { MessagesModule } from "src/components/messages/messages.module";
import { TopicsModule } from "src/components/topics/topics.module";

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

    TopicsModule,
    MessagesModule
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US
    },
    {
      provide: Config,
      useClass: AppConfig,
    },
    HttpClient,
    HttpService,
    HttpMockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
