import {
  Component,
  trigger,
  transition,
  style,
  animate,
  state
 } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { Message } from '../store';
import { MessagesActions } from '../actions';

@Component({
  selector: 'messages',
  template: require('./messages.html'),
  styles: [ require('./messages.scss') ],
  animations: [
  trigger('easeIn', [
    state('in', style({opacity: 1})),
    transition(':enter', [
      style({opacity: 0}),
      animate(500)
    ]),
    transition(':leave', [
      animate(500, style({opacity: 0}))
    ])
  ])
]
})
export class MessagesComponent {
  @select()
  private messages: Observable<Message[]>

  constructor(private messagesActions: MessagesActions) {}

  delete(m: Message) {
    this.messagesActions.removeMessage(m.id);
  }
}
