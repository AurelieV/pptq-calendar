import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState, MessageType } from '../store';

@Injectable()
export class MessagesActions {
  constructor(private ngRedux: NgRedux<IAppState>) {}
  private static counter: number = 0;

  static ADD_MESSAGE = 'ADD_MESSAGE';
  static REMOVE_MESSAGE = 'REMOVE_MESSAGE';

  addMessage(content: string, type: MessageType = '', time: number = 5000) {
    const id = MessagesActions.counter++;
    this.ngRedux.dispatch({
      type: MessagesActions.ADD_MESSAGE,
      payload: {
        content,
        type,
        id
      }
    });
    window.setTimeout(() => this.removeMessage(id), time)
  }

  removeMessage(id: number) {
    this.ngRedux.dispatch({
      type: MessagesActions.REMOVE_MESSAGE,
      payload: id
    });
  }
}
