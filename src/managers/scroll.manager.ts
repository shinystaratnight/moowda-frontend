import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { User } from 'src/models/user';
import { IMeService, me_service } from 'src/services/me/me.interface';

@Injectable({providedIn: 'root'})
export class ScrollManager {

  position$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  set position(position: number) {
    if (this.position !== position) {
      this.position$.next(position);
    }
  }

  get position(): number {
    return this.position$.getValue();
  }
}
