import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { User } from 'src/models/user';
import { IMeService, me_service } from 'src/services/me/me.interface';

@Injectable({providedIn: 'root'})
export class MeManager {

  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  set user(user: User) {
    if (JSON.stringify(this.user) !== JSON.stringify(user)) {
      this.user$.next(user);
    }
  }

  get user(): User {
    return this.user$.getValue();
  }

  logged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.user);

  set logged(logged: boolean) {
    if (this.logged !== logged) {
      this.logged$.next(logged);
    }
  }

  get logged() {
    return this.logged$.getValue();
  }

  constructor(@Inject(me_service) private meService: IMeService,
              private config: AppConfig) {

    this.config.authorization$.subscribe(token => {
      if (!!token) {
        this.meService.getMe().subscribe(user => this.user = user, () => this.user = null);
      } else {
        this.user = null;
      }
    });

    this.user$.pipe(map(user => !!user), distinctUntilChanged())
      .subscribe(logged => this.logged = logged);
  }
}
