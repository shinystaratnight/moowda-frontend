import { Component, EventEmitter, HostBinding, Inject, Output } from '@angular/core';
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

  @HostBinding('style.height') get height() {
    const vh = window.innerHeight * 0.01;
    return `calc(var(${vh}px, 1vh) * 100)`;
  }

  constructor(@Inject(topics_service) private topicsService: ITopicsService) {
  }

  create(): void {
    this.topicsService.create(this.title).subscribe(topic => this.created.emit(topic));
  }
}
