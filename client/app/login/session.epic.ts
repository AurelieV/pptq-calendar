import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable, Epic } from 'redux-observable';
import { SessionActions } from '../actions/session';
import { Observable } from 'rxjs/Observable';
import { MyUser }  from '../sdk/models';
import { MyUserApi } from '../sdk/services/custom/MyUser';

@Injectable()
export class SessionEpics {
  constructor(private http: Http, private myUser: MyUserApi) {}

  getEpics(): Epic<any>[] {
    return [this.login, this.logout, this.fetchUser];
  }

  login = (action$: ActionsObservable<any>) => {
    return action$.ofType(SessionActions.LOGIN_USER)
      .flatMap(({payload}) => {
        return this.myUser.login(payload)
          .map(res => ({
            type: SessionActions.LOGIN_USER_SUCCESS,
            payload: res
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
        return this.myUser.findById(payload.userId)
          .map(user => ({
            type: SessionActions.FETCH_USER_SUCCESS,
            payload: user
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
        return this.myUser.logout()
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
