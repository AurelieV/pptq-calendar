import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable, Epic } from 'redux-observable';
import { SessionActions } from '../actions/session';
import { Observable } from 'rxjs/Observable';

const BASE_URL = "api/MyUsers";

@Injectable()
export class SessionEpics {
  constructor(private http: Http) {}

  getEpics(): Epic<any>[] {
    return [this.login, this.logout, this.fetchUser];
  }

  login = (action$: ActionsObservable<any>) => {
    return action$.ofType(SessionActions.LOGIN_USER)
      .flatMap(({payload}) => {
        return this.http.post(`${BASE_URL}/login`, payload)
          .map(res => ({
            type: SessionActions.LOGIN_USER_SUCCESS,
            payload: res.json()
          }))
          .catch(error => Observable.of({
            type: SessionActions.LOGIN_USER_ERROR
          })
        );
      });
  };

  fetchUser = (action$: ActionsObservable<any>) => {
    return action$.ofType(SessionActions.LOGIN_USER_SUCCESS)
      .flatMap(({payload}) => {
        return this.http.get(`${BASE_URL}/${payload.userId}`, {})
          .map(res => ({
            type: SessionActions.FETCH_USER_SUCCESS,
            payload: res.json()
          }))
          .catch(error => Observable.of({
            type: SessionActions.FETCH_USER_ERROR
          })
        );
      });
  };

  logout = (action$: ActionsObservable<any>) => {
    return action$.ofType(SessionActions.LOGOUT_USER)
      .flatMap(({payload}) => {
        return this.http.post(`${BASE_URL}/logout`, {})
          .map(res => ({
            type: SessionActions.LOGOUT_USER_SUCCESS
          }))
          .catch(error => Observable.of({
            type: SessionActions.LOGOUT_USER_ERROR
          })
        );
      });
  };
}
