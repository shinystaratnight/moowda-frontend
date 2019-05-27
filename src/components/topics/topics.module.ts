import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TopicsServiceProvider } from 'src/services/topics/provider';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { ShareTopicComponent } from './share-topic/share-topic.component';
import { TopicTitleComponent } from './topic-title/topic-title.component';
import { TopicsListComponent } from './topics-list/topics-list.component';

@NgModule({
  declarations: [
    TopicsListComponent,
    ShareTopicComponent,
    TopicTitleComponent,
    CreateTopicComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule,
    FormsModule
  ],
  exports: [
    TopicsListComponent,
    ShareTopicComponent,
    TopicTitleComponent,
    CreateTopicComponent
  ],
  entryComponents: [
    ShareTopicComponent,
    CreateTopicComponent
  ],
  providers: [
    TopicsServiceProvider
  ]
})
export class TopicsModule {
}
