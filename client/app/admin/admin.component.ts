import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: "admin-root",
  template: require("./admin.html"),
  styles: [ require("./admin.scss") ]
})
export class AdminComponent implements OnInit, OnDestroy {
  @select() private session$: Observable<any>;
  private subscriptions: Subscription[] = [];
  private roles: string[] = [];

  ngOnInit() {
    this.subscriptions.push(this.session$.subscribe((s) => {
      this.roles = s.roles;
    }));
  }

  isAdmin() {
    return this.roles.indexOf('admin') > -1;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
