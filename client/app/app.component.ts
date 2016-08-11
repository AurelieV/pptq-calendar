import { Component, ViewEncapsulation } from '@angular/core';
import { LoginService } from './login/loginService';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { SidenavComponent } from './sidenav';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  providers: [ LoginService ],
  directives: [ ROUTER_DIRECTIVES, SidenavComponent ],
  templateUrl: './app.template.html'
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
