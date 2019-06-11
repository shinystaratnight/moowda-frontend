import { Component, Input } from '@angular/core';

@Component({
  selector: 'moo-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent {

  @Input() image;

}
