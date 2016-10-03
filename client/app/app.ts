import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: "app-root",
  template: require("./app.html"),
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private isSidenavOpen: boolean = false;
}
