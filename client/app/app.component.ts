import { Component, ViewEncapsulation } from '@angular/core';
import { LoginService } from './login/loginService';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  providers: [ LoginService ],
  directives: [ ROUTER_DIRECTIVES ],
  template: `
    <button class="button" (click)="login()">Connexion</button>
    <button (click)="logout()">Deconnexion</button>
    <router-outlet></router-outlet>
  `
})
export class App {
  constructor(private logger: LoginService) {}

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
