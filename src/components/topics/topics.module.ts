import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TopicsServiceProvider } from 'src/services/topics/provider';
import { ShareTopicComponent } from './share-topic/share-topic.component';
import { TopicsListComponent } from './topics-list/topics-list.component';
import { TopicTitleComponent } from './topic-title/topic-title.component';

@NgModule({
  declarations: [
    TopicsListComponent,
    ShareTopicComponent,
    TopicTitleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule
  ],
  exports: [
    TopicsListComponent,
    ShareTopicComponent,
    TopicTitleComponent
  ],
  entryComponents: [
    ShareTopicComponent
  ],
  providers: [
    TopicsServiceProvider
  ]
})
export class TopicsModule {
}
