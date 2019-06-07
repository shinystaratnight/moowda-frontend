import { Injectable } from '@angular/core';
import { HttpMockService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { Topic, TopicCard } from 'src/models/topic';
import { ITopicsService } from './interface';

@Injectable({providedIn: 'root'})
export class TopicsMockService implements ITopicsService {

  constructor(private http: HttpMockService) {
  }

  list(): Observable<TopicCard[]> {
    return this.http.get<TopicCard[]>('topics/list.json')
      .pipe(map(arr => arr.map(el => deserialize(el, TopicCard))));
  }

  get(id: number): Observable<Topic> {
    return this.http.get('topics/get.json')
      .pipe(map(obj => deserialize(obj, Topic)));
  }

  create(title: string): Observable<Topic> {
    return this.http.get('topics/get.json')
      .pipe(map(obj => deserialize(obj, Topic)));
  }
}
