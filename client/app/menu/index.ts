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
  OnChanges,
  OnInit,
  OnDestroy
} from '@angular/core';
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
export class MenuComponent implements OnChanges, OnInit, OnDestroy {
  @Input() public open: boolean;
  @select() private session$: Observable<any>;
  @Output() public close = new EventEmitter();

  private state: string = 'open';
  private subscriptions: Subscription[] = [];
  private user: MyUser = null;
  private roles: string[] = [];

  constructor(private sessionAction: SessionActions) {}

  ngOnInit() {
    this.subscriptions.push(this.session$.subscribe((s) => {
      this.user = s.user;
      this.roles = s.roles;
    }));
  }

  logout() {
    this.sessionAction.logout();
  }

  isAdmin() {
    return this.roles.indexOf('admin') > -1;
  }

  ngOnChanges(changes) {
    if (changes.open) {
      this.state = 'open';
    } else {
      this.state = 'close';
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

}
