import {
  Component,
  ViewEncapsulation,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';

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
export class MenuComponent implements OnChanges {
  @Input() public open: boolean;
  @Output() public close = new EventEmitter();
  private state: string = 'open';

  ngOnChanges(changes) {
    if (changes.open) {
      this.state = 'open';
    } else {
      this.state = 'close';
    }
  }

}
