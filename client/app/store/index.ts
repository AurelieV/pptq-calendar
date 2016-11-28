import { sessionReducer } from './reducers/session';
import { regionsReducer } from './reducers/regions';
import { combineReducers } from 'redux';
import { MyUser, Region }  from '../sdk/models';

export const rootReducer = combineReducers<IAppState>({
  session: sessionReducer,
  regions: regionsReducer
});

export interface Session {
  user?: MyUser;
  roles?: string[];
}

export interface IAppState {
  session?: Session;
  regions?: Region[];
};
