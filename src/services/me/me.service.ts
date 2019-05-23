import { Injectable } from '@angular/core';
import { HttpService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { User } from 'src/models/user';
import { IMeService } from 'src/services/me/me.interface';

@Injectable()
export class MeService implements IMeService {

  constructor(private http: HttpService) {
  }

  getMe(): Observable<User> {
    return this.http.get<User>('me')
      .pipe(map(obj => deserialize(obj, User)));
  }
}
