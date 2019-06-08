import { EventEmitter, Injectable, InjectionToken, Injector } from '@angular/core';
import { Authorization } from 'junte-angular';
import { BehaviorSubject } from 'rxjs';
import { AppConfig } from 'src/app-config';
import { Topic, TopicEvent } from 'src/models/topic';
import { WsService, WsState } from 'src/services/ws.service';

@Injectable()
export class TopicsSocketService {

  private authorization$: BehaviorSubject<Authorization> = new BehaviorSubject<Authorization>(null);
  private requestService: WsService<Topic>;
  event$: EventEmitter<TopicEvent> = new EventEmitter<TopicEvent>();

  set authorization(authorization: Authorization) {
    this.authorization$.next(authorization);
  }

  get authorization() {
    return this.authorization$.getValue();
  }

  get state(): WsState {
    return this.requestService.state;
  }

  constructor(injector: Injector, private config: AppConfig) {
    config.authorization$.subscribe(authorization => this.authorization = authorization);

    let token = new InjectionToken('TopicsSocketService');
    let provider = {
      provide: token,
      useFactory: () => new WsService<Topic>(config),
      deps: []
    };

    this.requestService = Injector.create({providers: [provider], parent: injector})
      .get(token) as WsService<Topic>;
    this.bindEvents();

    this.authorization$.subscribe(() => this.requestService.connect('topics/events', this.authorization));
  }

  private bindEvents() {
    this.requestService.onMessage.subscribe(event =>
      this.event$.next(TopicEvent.create(event as TopicEvent)));
  }

  close() {
    this.requestService.close();
  }
}
