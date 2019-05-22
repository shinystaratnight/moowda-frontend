import { Injectable } from '@angular/core';
import { Authorization, HttpService } from 'junte-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts';
import { LoginCredentials, RegistrationCredentials } from 'src/models/user-credentials';
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
}
