import { Injectable } from '@angular/core';
import { Config } from 'junte-angular';

const APP_VERSION = '1.0.0';
const MOBILE_REGEX = /(iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone|Opera Mini)/ig;

@Injectable({providedIn: 'root'})
export class AppConfig extends Config {

  version = APP_VERSION;

  set backendEndpoint(backendEndpoint: string) {
    if (!!backendEndpoint) {
      localStorage.setItem('backendEndpoint', backendEndpoint);
    } else {
      localStorage.removeItem('backendEndpoint');
    }
  }

  get backendEndpoint(): string {
    return localStorage.backendEndpoint !== undefined
      ? localStorage.backendEndpoint : this.localMode ? 'http://localhost:4200' : 'https://moowda.com/api';
  }

  mocksPath = './assets/mocks';
  useMocks = true;

  device = {
    mobile: (() => MOBILE_REGEX.test(navigator.userAgent))()
  };

  wsEndpointPrefix: string = 'ws';

  get wsEndpoint() {
    return localStorage.backendEndpoint !== undefined
      ? localStorage.backendEndpoint : this.localMode ? 'wss://localhost:4200' : 'wss://moowda.com/api';
  }

  set wsEndpoint(wsEndpoint: string) {
    if (wsEndpoint) {
      localStorage.setItem('wsEndpoint', wsEndpoint);
    } else {
      localStorage.removeItem('wsEndpoint');
    }
  }
}
