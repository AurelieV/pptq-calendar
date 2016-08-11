import {
  Component,
  ViewEncapsulation,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/core';
import { LoginService } from './login/loginService';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.style.scss')
  ],
  providers: [ LoginService ],
  directives: [ ROUTER_DIRECTIVES ],
  templateUrl: './app.template.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      state('void', style({transform: 'translateX(-100%)'})),
      transition('void <=> *', [animate(200)])
    ])
  ]
})
export class App {
  private isSidenavOpen: boolean = false;
  constructor(private logger: LoginService) {}

  closeSidenav() {
    this.isSidenavOpen = false;
  }

  openSidenav() {
    this.isSidenavOpen = true;
  }

  login() {
    this.logger.login({username: "admin", password: "admin"})
      .subscribe((user) => {
        console.log("user", user);
      })
  }

  logout() {
    this.logger.logout()
      .subscribe((data) => {
        console.log("data", data);
      })
  }
}
