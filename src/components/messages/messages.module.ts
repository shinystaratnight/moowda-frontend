import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ImageHeightPipe, SanitizePipe } from 'src/components/messages/messages.pipe';
import { TopicsModule } from 'src/components/topics/topics.module';
import { MessagesServiceProvider, messagesSocketServiceProvider } from 'src/services/messages/provider';
import { TopicsServiceProvider } from 'src/services/topics/provider';
import { CreateMessageComponent } from './create-message/create-message.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { MessagesListComponent } from './messages-list/messages-list.component';

@NgModule({
  declarations: [
    MessagesListComponent,
    CreateMessageComponent,
    ImagePreviewComponent,
    SanitizePipe,
    ImageHeightPipe
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,

    TopicsModule
  ],
  entryComponents: [
    ImagePreviewComponent
  ],
  exports: [
    MessagesListComponent,
    CreateMessageComponent
  ],
  providers: [
    MessagesServiceProvider,
    TopicsServiceProvider,
    messagesSocketServiceProvider
  ]
})
export class MessagesModule {
}
