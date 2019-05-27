import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Topic } from 'src/models/topic';
import { ITopicsService, topics_service } from 'src/services/topics/interface';

@Injectable({providedIn: 'root'})
export class TopicsManager {

  topic$: BehaviorSubject<Topic> = new BehaviorSubject<Topic>(null);

  set topic(topic: Topic) {
    if (!!topic) {
      this.topic$.next(topic);
    }
  }

  get topic(): Topic {
    return this.topic$.getValue();
  }

  constructor(@Inject(topics_service) private topicsService: ITopicsService) {
  }

  create(title) {
    const action = this.topicsService.create(title);
    action.subscribe(topic => this.topic = topic);
    return action;
  }
}
