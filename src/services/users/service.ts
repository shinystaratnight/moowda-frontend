import { Injectable } from '@angular/core';
import { Authorization, HttpService } from 'junte-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts';
import {
  LoginCredentials,
  RegistrationCredentials,
  RestorePasswordCredentials,
  RestoreRequestCredentials
} from 'src/models/user-credentials';
import { IUsersService } from './interface';

@Injectable({providedIn: 'root'})
export class UsersService implements IUsersService {

  constructor(private http: HttpService) {
  }

  registration(credentials: RegistrationCredentials): Observable<Authorization> {
    return this.http.post<Authorization>('register', serialize(credentials))
      .pipe(map(obj => deserialize(obj, Authorization)));
  }

  login(credentials: LoginCredentials): Observable<Authorization> {
    return this.http.post<Authorization>('login', serialize(credentials))
      .pipe(map(obj => deserialize(obj, Authorization)));
  }

  logout(): Observable<any> {
    return of(null);
  }

  restoreRequest(credentials: RestoreRequestCredentials): Observable<any> {
    return this.http.post<any>('restore-request', serialize(credentials));
  }

  restorePassword(credentials: RestorePasswordCredentials): Observable<Authorization> {
    return this.http.post<any>(`restore`, serialize(credentials))
      .pipe(map(obj => deserialize(obj, Authorization)));
  }
}
