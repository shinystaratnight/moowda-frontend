import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTopicCredentials, Topic, TopicCard } from 'src/models/topic';

export interface ITopicsService {

  list(): Observable<TopicCard[]>;

  get(id: number): Observable<Topic>;

  create(credentials: CreateTopicCredentials): Observable<Topic>;

}

export let topics_service = new InjectionToken('topics_service');
