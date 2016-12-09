import { sessionReducer } from './reducers/session';
import { regionsReducer } from './reducers/regions';
import { messagesReducer } from './reducers/messages';
import { usersReducer } from './reducers/users';
import { seasonsReducer } from './reducers/seasons';
import { tournamentsReducer } from './reducers/tournaments';
import { combineReducers, Action } from 'redux';
import { MyUser, Region, Season, Tournament }  from '../sdk/models';

export const rootReducer = combineReducers<IAppState>({
  session: sessionReducer,
  regions: regionsReducer,
  messages: messagesReducer,
  users: usersReducer,
  seasons: seasonsReducer,
  tournaments: tournamentsReducer
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
  users?: MyUser[];
  seasons?: Season[];
  tournaments?: Tournament[];
};
