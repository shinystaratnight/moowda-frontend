import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from 'src/models/message';
import { IMessagesService, messages_service } from 'src/services/messages/interface';

@Injectable({providedIn: 'root'})
export class MessagesManager {

  message$: BehaviorSubject<Message> = new BehaviorSubject<Message>(null);

  set message(message: Message) {
    if (!!message) {
      this.message$.next(message);
    }
  }

  get message(): Message {
    return this.message$.getValue();
  }

  constructor(@Inject(messages_service) private messagesService: IMessagesService) {
  }

  send(id, content, images) {
    this.messagesService.create(id, content, images)
      .subscribe(message => this.message = message);
  }
}
