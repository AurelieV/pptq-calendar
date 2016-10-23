import { Component } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { SessionActions } from '../actions/session';

@Component({
  template: require('./login.html')
})
export class LoginComponent {
  @select()
  private session$: Observable<any>;

  constructor(private sessionActions: SessionActions) {}

    login(credentials) {
      this.sessionActions.login(credentials);
    }

    logout() {
      this.sessionActions.logout();
    }
}
