import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts';
import { Message, MessageCreate, PagingMessageCard } from 'src/models/message';
import { IMessagesService } from 'src/services/messages/interface';

@Injectable({providedIn: 'root'})
export class MessagesService implements IMessagesService {

  constructor(private http: HttpService) {
  }

  list(id: number, page: number, pageSize: number): Observable<PagingMessageCard> {
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    });

    return this.http.get<PagingMessageCard>(`topics/${id}/messages`, params)
      .pipe(map(obj => deserialize(obj, PagingMessageCard)));
  }

  create(id: number, message: MessageCreate): Observable<Message> {
    return this.http.post(`topics/${id}/messages`, serialize(message))
      .pipe(map(obj => deserialize(obj, Message)));
  }
}
