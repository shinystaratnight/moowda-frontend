import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/components/layout/layout.component';
import { MessagesListComponent } from 'src/components/messages/messages-list/messages-list.component';
import { OutletComponent } from 'src/components/outlet/outlet.component';
import { RestoreComponent } from 'src/components/restore/restore.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full'
  },
  {
    path: 'chat',
    component: OutletComponent,
    children: [
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
      },
      {
        path: 'restore/:hash',
        component: RestoreComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
