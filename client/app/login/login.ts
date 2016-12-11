import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SessionActions } from '../actions/session';
import { MyUser } from '../sdk/models';

@Component({
  template: require('./login.html'),
  styles: [require('./login.scss')]
})
export class LoginComponent implements OnInit, OnDestroy {
  @select()
  private session$: Observable<any>;
  private subscriptions: Subscription[] = [];
  private user: MyUser;

  constructor(private sessionActions: SessionActions, private router: Router) {}

  ngOnInit() {
    this.subscriptions.push(this.session$.subscribe((s) => {
      this.user = s.user;
    }));
  }

  login(credentials) {
    this.sessionActions.login(credentials);
    this.router.navigate(['../']);
  }

  logout() {
    this.sessionActions.logout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
