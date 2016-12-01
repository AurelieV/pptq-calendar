import { MessagesActions } from '../../actions';
import { Message } from '../index';

export function messagesReducer(state: Message[] = [], action: any) {
  switch (action.type) {
    case MessagesActions.ADD_MESSAGE:
      return state.concat(action.payload);
    case MessagesActions.REMOVE_MESSAGE:
      return state.filter((m) => m.id != action.payload);
    default:
      return state;
  }
}
