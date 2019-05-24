import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TopicsServiceProvider } from 'src/services/topics/provider';
import { TopicsListComponent } from './topics-list/topics-list.component';

@NgModule({
  declarations: [
    TopicsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule
  ],
  exports: [
    TopicsListComponent
  ],
  providers: [
    TopicsServiceProvider
  ]
})
export class TopicsModule {
}
