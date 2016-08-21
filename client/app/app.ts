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

@Component({
  selector: "app",
  template: require("./app.html"),
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.style.scss')
  ],
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

  closeSidenav() {
    this.isSidenavOpen = false;
  }

  openSidenav() {
    this.isSidenavOpen = true;
  }
}
