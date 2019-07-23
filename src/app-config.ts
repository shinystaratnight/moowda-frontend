import { Injectable } from '@angular/core';
import { Config } from 'junte-angular';

const APP_VERSION = '1.0.0';
const BACKEND_ENDPOINT = 'https://moowda.com/api';
const WS_ENDPOINT = 'wss://moowda.com';
const MOCKS_PATH = './assets/mocks';

@Injectable({providedIn: 'root'})
export class AppConfig extends Config {

  version = APP_VERSION;
  mocksPath = MOCKS_PATH;
  wsEndpointPrefix = 'ws';

  device = {
    mobile: (() => window.innerWidth <= 768)()
  };

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
