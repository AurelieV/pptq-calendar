import { sessionReducer } from "./reducers/session";
import { combineReducers } from 'redux';

export const rootReducer = combineReducers<IAppState>({
  session: sessionReducer
});

export interface IAppState {
  session?: any;
};
