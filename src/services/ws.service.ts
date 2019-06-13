import { EventEmitter, Injectable } from '@angular/core';
import { Authorization } from 'junte-angular';
import { AppConfig } from 'src/app-config';

export class WsState {
  static opening: string = 'opening';
  static opened: string = 'opened';
  static closed: string = 'closed';
  static error: string = 'error';
}

const REOPEN_INTERVAL = 5000;
const CLOSE_NORMAL = 1000;

@Injectable()
export class WsService<T> {

  private socket: WebSocket;
  private url: string;
  private authorization: Authorization;

  state: string;
  onOpen: EventEmitter<any> = new EventEmitter<any>();
  onClose: EventEmitter<any> = new EventEmitter<any>();
  onError: EventEmitter<any> = new EventEmitter<any>();
  onMessage: EventEmitter<T> = new EventEmitter<T>();

  constructor(private config: AppConfig) {

  }

  connect(url: string, authorization: Authorization = null) {
    // console.log(`connecting to ${url}`);
    this.url = url;
    this.authorization = authorization;
    this.open();
  }

  close() {
    if (!!this.socket) {
      // console.log('close ws');
      this.socket.close();
      this.socket = null;
    }
  }

  private open() {
    this.close();
    // console.log('open ws');
    this.socket = new WebSocket(this.getRequestUrl(this.url, this.authorization ? this.authorization.token : null));
    this.state = WsState.opening;
    this.bindEvents();
  }

  private bindEvents() {
    this.socket.onmessage = (e: any) => {
      // console.log('get message');
      // console.log(e);
      this.onMessage.emit(JSON.parse(e.data) as T);
    };

    this.socket.onopen = () => {
      // console.log('opened ws');
      this.state = WsState.opened;
      this.onOpen.emit();
    };

    this.socket.onclose = (event: CloseEvent) => {
      // console.log('closed');
      // console.log(event);
      this.state = WsState.closed;
      this.onClose.emit();
      if (event.code !== CLOSE_NORMAL) {
        this.state = WsState.error;
        // console.log('error');
        // console.log(`code ${event.code} try to reopen`);
        setTimeout(() => this.open(), REOPEN_INTERVAL);
        this.onError.emit();
      }
    };
  }

  private getRequestUrl(path: string, token: string): string {
    return `${this.config.wsEndpoint}/${this.config.wsEndpointPrefix}/${path}`
      + (token ? `?token=${token}` : '');
  }
}
