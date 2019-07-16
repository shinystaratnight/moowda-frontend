import { Component, EventEmitter, HostBinding, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validate } from 'junte-angular';
import { finalize } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { CreateTopicCredentials, Topic } from 'src/models/topic';
import { ITopicsService, topics_service } from 'src/services/topics/interface';

const MOBILE_HEADER_HEIGHT = 80;

@Component({
  selector: 'moo-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent {

  title: string;
  loading = false;

  topicForm: FormGroup = this.builder.group({
    title: [null, [Validators.required]]
  });

  @Output() created = new EventEmitter<Topic>();

  @HostBinding('style.height') get height() {
    return this.config.device.mobile ? `${window.innerHeight - MOBILE_HEADER_HEIGHT}px` : 'auto';
  }

  constructor(@Inject(topics_service) private topicsService: ITopicsService,
              private builder: FormBuilder,
              private config: AppConfig) {
  }

  create() {
    if (validate(this.topicForm)) {
      this.loading = true;
      this.topicsService.create(new CreateTopicCredentials(this.topicForm.value))
        .pipe(finalize(() => this.loading = false))
        .subscribe(topic => this.created.emit(topic));
    }
  }
}
