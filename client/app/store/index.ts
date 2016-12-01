import { sessionReducer } from './reducers/session';
import { regionsReducer } from './reducers/regions';
import { messagesReducer } from './reducers/messages';
import { combineReducers } from 'redux';
import { MyUser, Region }  from '../sdk/models';

export const rootReducer = combineReducers<IAppState>({
  session: sessionReducer,
  regions: regionsReducer,
  messages: messagesReducer
});

export interface Session {
  user?: MyUser;
  roles?: string[];
}

export type MessageType = '' | 'info' | 'warning' | 'success' | 'danger';
export interface Message {
  content: string;
  type: MessageType;
  id: number;
}

export interface IAppState {
  session?: Session;
  regions?: Region[];
  messages?: Message[];
};
