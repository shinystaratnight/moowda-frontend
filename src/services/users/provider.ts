import { Config, HttpMockService, HttpService } from 'junte-angular';
import { AppConfig } from 'src/app-config';
import { users_service } from './interface';
import { UsersService } from './service';
import { UsersMockService } from './service.mock';

export function UsersServiceFactory(httpService: HttpService,
                                    httpMockService: HttpMockService,
                                    config: AppConfig) {
  return config.useMocks ?
    new UsersMockService(httpMockService) :
    new UsersService(httpService);
}

export const UsersServiceProvider = {
  provide: users_service,
  useFactory: UsersServiceFactory,
  deps: [HttpService, HttpMockService, Config]
};
