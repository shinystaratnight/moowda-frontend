import { Injectable } from '@angular/core';
import { HttpMockService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { User } from 'src/models/user';
import { IMeService } from './me.interface';


@Injectable()
export class MeMockService implements IMeService {

  constructor(private http: HttpMockService) {
  }

  getMe(): Observable<User> {
    return this.http.get<User>('me/me.json')
      .pipe(map(obj => deserialize(obj, User)));
  }
}
