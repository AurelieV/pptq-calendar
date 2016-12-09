import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SessionActions } from '../actions/session';
import { MyUser } from '../sdk/models';

@Component({
  template: require('./myProfile.html'),
  styles: [require('./myProfile.scss')]
})
export class MyProfileComponent implements OnInit, OnDestroy {
  @select()
  private session$: Observable<any>;
  private subscriptions: Subscription[] = [];
  private user: MyUser;

  constructor(private sessionActions: SessionActions) {}

  ngOnInit() {
    this.subscriptions.push(this.session$.subscribe((s) => {
      this.user = s.user;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
