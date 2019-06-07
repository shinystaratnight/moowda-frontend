import { Injector } from '@angular/core';
import { HttpMockService, HttpService } from 'junte-angular';
import { AppConfig } from 'src/app-config';
import { MessagesSocketService } from 'src/services/messages/socket';
import { messages_service } from './interface';
import { MessagesService } from './service';
import { MessagesMockService } from './service.mock';

export function MessagesServiceFactory(httpService: HttpService,
                                       httpMockService: HttpMockService,
                                       config: AppConfig) {
  return config.useMocks ?
    new MessagesMockService(httpMockService) :
    new MessagesService(httpService);
}

export const MessagesServiceProvider = {
  provide: messages_service,
  useFactory: MessagesServiceFactory,
  deps: [HttpService, HttpMockService, AppConfig]
};

export function messagesSocketServiceFactory(injector: Injector, config: AppConfig) {
  return new MessagesSocketService(injector, config);
}

export let messagesSocketServiceProvider = {
  provide: MessagesSocketService,
  useFactory: messagesSocketServiceFactory,
  deps: [Injector, AppConfig]
};
