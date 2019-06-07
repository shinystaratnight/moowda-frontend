import { Injectable } from '@angular/core';
import { HttpService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { Topic, TopicCard } from 'src/models/topic';
import { ITopicsService } from 'src/services/topics/interface';

@Injectable({providedIn: 'root'})
export class TopicsService implements ITopicsService {

  constructor(private http: HttpService) {
  }

  list(): Observable<TopicCard[]> {
    return this.http.get<TopicCard[]>('topics')
      .pipe(map(arr => arr.map(el => deserialize(el, TopicCard))));
  }

  get(id: number): Observable<Topic> {
    return this.http.get<Topic>(`topics/${id}`)
      .pipe(map(obj => deserialize(obj, Topic)));
  }

  create(title: string): Observable<Topic> {
    return this.http.post<Topic>('topics', {title: title})
      .pipe(map(obj => deserialize(obj, Topic)));
  }
}
