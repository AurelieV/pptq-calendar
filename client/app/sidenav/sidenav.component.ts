import { Component, Input, Output, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'sidenav',
  styleUrls: [ './sidenav.style.scss' ],
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {
  @Input() isOpen: boolean;
  @Output() close = new EventEmitter();

  @HostListener("click")
  onClick() {
    console.log("coucou");
    this.close.emit({});
  }
}
