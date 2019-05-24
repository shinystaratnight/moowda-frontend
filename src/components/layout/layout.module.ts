import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MessagesModule } from 'src/components/messages/messages.module';
import { TopicsModule } from 'src/components/topics/topics.module';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule,

    TopicsModule,
    MessagesModule
  ]
})
export class LayoutModule {
}
