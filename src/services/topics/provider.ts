import { Injector } from '@angular/core';
import { HttpMockService, HttpService } from 'junte-angular';
import { AppConfig } from 'src/app-config';
import { TopicsSocketService } from 'src/services/topics/socket';
import { topics_service } from './interface';
import { TopicsService } from './service';
import { TopicsMockService } from './service.mock';

export function TopicsServiceFactory(httpService: HttpService,
                                     httpMockService: HttpMockService,
                                     config: AppConfig) {
  return config.useMocks ?
    new TopicsMockService(httpMockService) :
    new TopicsService(httpService);
}

export const TopicsServiceProvider = {
  provide: topics_service,
  useFactory: TopicsServiceFactory,
  deps: [HttpService, HttpMockService, AppConfig]
};

export function topicsSocketServiceFactory(injector: Injector, config: AppConfig) {
  return new TopicsSocketService(injector, config);
}

export let topicsSocketServiceProvider = {
  provide: TopicsSocketService,
  useFactory: topicsSocketServiceFactory,
  deps: [Injector, AppConfig]
};
