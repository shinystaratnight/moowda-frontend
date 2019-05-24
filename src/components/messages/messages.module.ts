import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MessagesServiceProvider } from 'src/services/messages/provider';
import { CreateMessageComponent } from './create-message/create-message.component';
import { MessagesListComponent } from './messages-list/messages-list.component';

@NgModule({
  declarations: [
    MessagesListComponent,
    CreateMessageComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  exports: [
    MessagesListComponent,
    CreateMessageComponent
  ],
  providers: [
    MessagesServiceProvider
  ]
})
export class MessagesModule {
}
