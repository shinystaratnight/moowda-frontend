import { HttpMockService, HttpService } from 'junte-angular';
import { AppConfig } from 'src/app-config';
import { me_service } from 'src/services/me/me.interface';
import { MeService } from 'src/services/me/me.service';
import { MeMockService } from 'src/services/me/me.service.mock';

export function MeServiceFactory(httpService: HttpService, httpMockService: HttpMockService, config: AppConfig) {
  return config.useMocks ?
    new MeMockService(httpMockService) :
    new MeService(httpService);
}

export let MeServiceProvider = {
  provide: me_service,
  useFactory: MeServiceFactory,
  deps: [HttpService, HttpMockService, AppConfig]
};
