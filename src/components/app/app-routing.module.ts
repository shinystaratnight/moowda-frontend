import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/components/layout/layout.component';
import { MessagesListComponent } from 'src/components/messages/messages-list/messages-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'topics',
    pathMatch: 'full'
  },
  {
    path: 'topics/:topic',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MessagesListComponent
      }
    ]
  },
  {
    path: 'topics',
    component: LayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
