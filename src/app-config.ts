import { Injectable } from '@angular/core';
import { Config } from 'junte-angular';

const APP_VERSION = '1.0.0';
const MOBILE_REGEX = /(iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone|Opera Mini)/ig;
const BACKEND_ENDPOINT = 'http://moowda.com/api';
const WS_ENDPOINT = 'ws://moowda.com';
const MOCKS_PATH = './assets/mocks';

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
      ? localStorage.backendEndpoint : BACKEND_ENDPOINT;
  }

  mocksPath = MOCKS_PATH;

  device = {
    mobile: (() => window.innerWidth <= 768)()
  };

  wsEndpointPrefix: string = 'ws';

  get wsEndpoint() {
    return localStorage.backendEndpoint !== undefined
      ? localStorage.backendEndpoint : WS_ENDPOINT;
  }

  set wsEndpoint(wsEndpoint: string) {
    if (wsEndpoint) {
      localStorage.setItem('wsEndpoint', wsEndpoint);
    } else {
      localStorage.removeItem('wsEndpoint');
    }
  }
}
