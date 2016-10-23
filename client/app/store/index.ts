import { sessionReducer } from "./reducers/session";
import { combineReducers } from 'redux';
import { MyUser }  from '../sdk/models';

export const rootReducer = combineReducers<IAppState>({
  session: sessionReducer
});

export interface Session {
  user?: MyUser;
  roles?: string[];
}

export interface IAppState {
  session?: Session;
};
