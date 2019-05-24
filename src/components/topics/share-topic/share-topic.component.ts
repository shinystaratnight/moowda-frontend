import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Topic } from 'src/models/topic';

@Component({
  selector: 'moo-share-topic',
  templateUrl: './share-topic.component.html',
  styleUrls: ['./share-topic.component.scss']
})
export class ShareTopicComponent {

  @Input() link: string = location.href;
  @Input() topic: Topic;
  @Output() shared = new EventEmitter<any>();
}
