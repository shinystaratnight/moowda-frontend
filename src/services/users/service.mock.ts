import { Injectable } from '@angular/core';
import { Authorization, HttpMockService } from 'junte-angular';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import {
  LoginCredentials,
  RegistrationCredentials,
  RestorePasswordCredentials,
  RestoreRequestCredentials
} from 'src/models/user-credentials';
import { IUsersService } from './interface';

@Injectable({providedIn: 'root'})
export class UsersMockService implements IUsersService {

  constructor(private http: HttpMockService) {
  }

  registration(credentials: RegistrationCredentials): Observable<Authorization> {
    return of({type: 'mock', token: 'mock'})
      .pipe(map(src => deserialize(src, Authorization)), delay(500));
  }

  login(credentials: LoginCredentials): Observable<Authorization> {
    return of({type: 'mock', token: 'mock'})
      .pipe(map(src => deserialize(src, Authorization)), delay(500));
  }

  logout(): Observable<any> {
    return of(null);
  }

  restoreRequest(credentials: RestoreRequestCredentials): Observable<any> {
    return of(null);
  }

  restorePassword(credentials: RestorePasswordCredentials): Observable<Authorization> {
    return of({type: 'mock', token: 'mock'})
      .pipe(map(src => deserialize(src, Authorization)), delay(500));
  }
}
