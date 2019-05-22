import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TopicsServiceProvider } from "src/services/topics/provider";
import { TopicsListComponent } from './topics-list/topics-list.component';

@NgModule({
  declarations: [
    TopicsListComponent
  ],
  imports: [
    CommonModule
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
