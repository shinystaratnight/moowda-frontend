import { Injectable } from '@angular/core';
import { Config } from 'junte-angular';

const APP_VERSION = '1.0.0';

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
}
