import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TopicsModule } from 'src/components/topics/topics.module';
import { MessagesServiceProvider } from 'src/services/messages/provider';
import { TopicsServiceProvider } from 'src/services/topics/provider';
import { CreateMessageComponent } from './create-message/create-message.component';
import { MessagesListComponent } from './messages-list/messages-list.component';

@NgModule({
  declarations: [
    MessagesListComponent,
    CreateMessageComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,

    TopicsModule
  ],
  exports: [
    MessagesListComponent,
    CreateMessageComponent
  ],
  providers: [
    MessagesServiceProvider,
    TopicsServiceProvider
  ]
})
export class MessagesModule {
}
