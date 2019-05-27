import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Topic } from 'src/models/topic';
import { ITopicsService, topics_service } from 'src/services/topics/interface';

@Component({
  selector: 'moo-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent {

  title: string;
  @Output() created = new EventEmitter<Topic>();

  constructor(@Inject(topics_service) private topicsService: ITopicsService) {
  }

  create() {
    this.topicsService.create(this.title).subscribe(() => this.created.emit());
  }
}
