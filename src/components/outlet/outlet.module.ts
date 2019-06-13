import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OutletComponent } from './outlet.component';

@NgModule({
  declarations: [
    OutletComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    OutletComponent
  ]
})
export class OutletModule {
}
