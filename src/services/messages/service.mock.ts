import { Injectable } from '@angular/core';
import { HttpMockService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { Message, MessageCreate, PagingMessageCard } from 'src/models/message';
import { IMessagesService } from './interface';

@Injectable({providedIn: 'root'})
export class MessagesMockService implements IMessagesService {

  constructor(private http: HttpMockService) {
  }

  list(id: number, page: number, pageSize: number): Observable<PagingMessageCard> {
    return this.http.get<PagingMessageCard>(`messages/list-${id || 1}.json`)
      .pipe(map(obj => deserialize(obj, PagingMessageCard)));
  }

  create(id: number, message: MessageCreate): Observable<Message> {
    return this.http.get('messages/get.json')
      .pipe(map(obj => deserialize(obj, Message)));
  }

  read(id: number, message: number): Observable<any> {
    return this.http.get('topics/get.json');
  }
}
