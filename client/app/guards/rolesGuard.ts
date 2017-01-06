import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { IAppState, Session } from '../store';
import { MessagesActions } from '../actions';

@Injectable()
export class AdminGuard {
  constructor(private ngRedux: NgRedux<IAppState>, private messages: MessagesActions) {}

  canActivate(): Observable<boolean> {
    return this.ngRedux
      .select<Session>('session')
      .filter(s => {
        return s.roles !== undefined
      })
      .map(({roles}) => {
        const result = roles.indexOf('admin') > -1;
        if (!result)
          this.messages.addMessage("Vous n'avez pas accès à cette partie de l'application", 'danger');

        return result;
      })
      .take(1)
    ;
  }
}

@Injectable()
export class JudgeGuard {
  constructor(private ngRedux: NgRedux<IAppState>, private messages: MessagesActions) {}

  canActivate(): Observable<boolean> {
    return this.ngRedux
      .select<Session>('session')
      .filter(s => {
        return s.roles !== undefined
      })
      .map(({roles}) => {
        const result = roles.indexOf('judge') > -1 || roles.indexOf('admin') > -1;
        if (!result)
          this.messages.addMessage("Vous n'avez pas accès à cette partie de l'application", 'danger');

        return result;
      })
      .take(1)
    ;
  }
}
