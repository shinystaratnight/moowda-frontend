import { EventEmitter, Injectable, InjectionToken, Injector } from '@angular/core';
import { Authorization } from 'junte-angular';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { Message, MessageEvent } from 'src/models/message';
import { WsService, WsState } from 'src/services/ws.service';

@Injectable()
export class MessagesSocketService {

  private authorization$: BehaviorSubject<Authorization> = new BehaviorSubject<Authorization>(null);
  _topic: number;

  set authorization(authorization: Authorization) {
    this.authorization$.next(authorization);
  }

  get authorization() {
    return this.authorization$.getValue();
  }

  set topic(topic: number) {
    this._topic = topic;
    this.topic$.emit(topic);
  }

  get topic() {
    return this._topic;
  }

  get state(): WsState {
    return this.requestService.state;
  }

  topic$: EventEmitter<number> = new EventEmitter<number>();

  private requestService: WsService<Message>;
  event$: EventEmitter<MessageEvent> = new EventEmitter<MessageEvent>();

  constructor(injector: Injector, private config: AppConfig) {
    config.authorization$.subscribe(authorization => this.authorization = authorization);

    let token = new InjectionToken('MessagesSocketService');
    let provider = {
      provide: token,
      useFactory: () => new WsService<Message>(config),
      deps: []
    };

    this.requestService = Injector.create({providers: [provider], parent: injector})
      .get(token) as WsService<Message>;
    this.bindEvents();

    combineLatest(this.topic$, this.authorization$)
      .pipe(filter(([topic]) => !!topic))
      .subscribe(() => this.requestService.connect(`topics/${this.topic}/events`, this.authorization));
  }

  private bindEvents() {
    this.requestService.onMessage.subscribe(event =>
      this.event$.next(MessageEvent.create(event as MessageEvent)));
  }

  close() {
    this.requestService.close();
  }
}
