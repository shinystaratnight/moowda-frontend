import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic, TopicCard } from "src/models/topic";

export interface ITopicsService {

  list(): Observable<TopicCard[]>;

  get(id: number): Observable<Topic>;

  create(title: string): Observable<Topic>;

}

export let topics_service = new InjectionToken('topics_service');
