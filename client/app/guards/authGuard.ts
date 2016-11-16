import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { NgRedux } from 'ng2-redux';

import { IAppState, Session } from '../store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private ngRedux: NgRedux<IAppState>, private router: Router) {}

  canActivate() {
    return this.ngRedux
      .select<Session>('session')
      .filter((s) => s.user !== undefined)
      .map((s) => {
        if (s.user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
      .take(1)
    ;
  }
}
