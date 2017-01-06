import {
  Component,
  ViewEncapsulation,
  trigger,
  state,
  style,
  transition,
  animate,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { MyUser }  from '../sdk/models';
import { SessionActions } from '../actions';
import { Session } from '../store';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'menu',
  template: require('./menu.html'),
  styles: [ require('./menu.scss')],
  animations: [
    trigger('flyInOut', [
      state('open', style({transform: 'translateX(0)'})),
      state('void', style({transform: 'translateX(-100%)'})),
      transition('void <=> open', [animate(200)])
    ])
  ]
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() public open: boolean;
  @select() private session$: Observable<any>;
  @Output() public close = new EventEmitter();

  private subscriptions: Subscription[] = [];
  private user: MyUser = null;
  private roles: string[] = [];

  constructor(private sessionAction: SessionActions, private router: Router) {}

  ngOnInit() {
    this.subscriptions.push(this.session$.subscribe((s) => {
      this.user = s.user;
      this.roles = s.roles;
    }));
  }

  logout() {
    this.sessionAction.logout();
    this.router.navigate(['./login']);
  }

  isAdmin() {
    return this.roles && this.roles.indexOf('admin') > -1;
  }

  isJudge() {
    return this.roles && this.roles.indexOf('judge') > -1;
  }

  get state() {
    return this.open ? 'open' : 'close';
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

}
