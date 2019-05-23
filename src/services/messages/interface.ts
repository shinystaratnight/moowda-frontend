import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, PagingMessageCard } from 'src/models/message';

export interface IMessagesService {

  list(id: number, page: number, pageSize: number): Observable<PagingMessageCard>;

  create(id: number, content: string, images: number[]): Observable<Message>;

}

export let messages_service = new InjectionToken('messages_service');
