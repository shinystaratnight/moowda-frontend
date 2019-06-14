import { Component, EventEmitter, HostBinding, Inject, Output } from '@angular/core';
import { AppConfig } from 'src/app-config';
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
    return this.config.device.mobile ? `${window.innerHeight - 80}px` : 'auto';
  }

  constructor(@Inject(topics_service) private topicsService: ITopicsService,
              private config: AppConfig) {
  }

  create() {
    this.topicsService.create(this.title).subscribe(() => this.created.emit());
  }
}
