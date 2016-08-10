import { Component, ViewEncapsulation } from '@angular/core';
import { LoginService } from './login/loginService';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  providers: [ LoginService ],
  template: `
    <button (click)="login()">Connexion</button>
    <button (click)="logout()">Deconnexion</button>
    <ng-outlet></ng-outlet>
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
