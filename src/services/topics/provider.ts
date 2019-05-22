import { Config, HttpMockService, HttpService } from 'junte-angular';
import { AppConfig } from 'src/app-config';
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
  deps: [HttpService, HttpMockService, Config]
};
