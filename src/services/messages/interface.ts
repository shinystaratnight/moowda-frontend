import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, MessageCreate, PagingMessageCard } from 'src/models/message';

export interface IMessagesService {

  list(id: number, page: number, pageSize: number): Observable<PagingMessageCard>;

  create(id: number, message: MessageCreate): Observable<Message>;

  read(id: number, message: number): Observable<any>;
}

export let messages_service = new InjectionToken('messages_service');
