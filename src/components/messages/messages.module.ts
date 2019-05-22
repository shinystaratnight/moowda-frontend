import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { MessagesListComponent } from './messages-list/messages-list.component';
import { CreateMessageComponent } from './create-message/create-message.component';

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
  ]
})
export class MessagesModule {
}
