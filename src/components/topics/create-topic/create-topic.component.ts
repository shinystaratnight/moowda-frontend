import { Component, EventEmitter, Output } from '@angular/core';
import { TopicsManager } from 'src/managers/topics.manager';
import { Topic } from 'src/models/topic';

@Component({
  selector: 'moo-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent {

  title: string;
  @Output() created = new EventEmitter<Topic>();

  constructor(private topics: TopicsManager) {
  }

  create() {
    this.topics.create(this.title).subscribe(() => this.created.emit());
  }
}
