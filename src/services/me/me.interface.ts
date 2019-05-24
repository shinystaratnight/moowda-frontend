import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';

export interface IMeService {
  getMe(): Observable<User>;
}

export let me_service = new InjectionToken('IMeService');
