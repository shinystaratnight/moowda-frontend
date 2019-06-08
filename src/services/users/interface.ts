import { InjectionToken } from '@angular/core';
import { Authorization } from 'junte-angular';
import { Observable } from 'rxjs';
import {
  LoginCredentials,
  RegistrationCredentials,
  RestorePasswordCredentials,
  RestoreRequestCredentials
} from 'src/models/user-credentials';

export interface IUsersService {

  registration(credentials: RegistrationCredentials): Observable<Authorization>;

  login(credentials: LoginCredentials): Observable<Authorization>;

  logout(): Observable<any>;

  restoreRequest(credentials: RestoreRequestCredentials): Observable<any>;

  restorePassword(credentials: RestorePasswordCredentials): Observable<Authorization>;
}

export let users_service = new InjectionToken('users_service');
