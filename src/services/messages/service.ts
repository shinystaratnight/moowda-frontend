import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { Message, PagingMessageCard } from 'src/models/message';
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

  create(id: number, content: string, images: number[]): Observable<Message> {
    return this.http.post(`topics/${id}/messages`)
      .pipe(map(obj => deserialize(obj, Message)));
  }
}
