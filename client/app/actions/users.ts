import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../store';
import { MyUserInterface, MyUser } from '../sdk/models';
import { MyUserApi } from '../sdk/services/custom/MyUser';

@Injectable()
export class UsersActions {
  constructor(private ngRedux: NgRedux<IAppState>, private user: MyUserApi) {}

  static FETCH_USERS = 'FETCH_USERS';
  static FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
  static FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

  static CREATE_USER = 'CREATE_USER';
  static CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
  static CREATE_USER_ERROR = 'CREATE_USER_ERROR';

  fetchUsers(): Observable<MyUser[]> {
    this.ngRedux.dispatch({ type: UsersActions.FETCH_USERS });
    const obs = this.user.find()
      .do((users) => {
        this.ngRedux.dispatch({
          type: UsersActions.FETCH_USERS_SUCCESS,
          payload: users
        });
      }, (err) => {
        this.ngRedux.dispatch({
          type: UsersActions.FETCH_USERS_ERROR,
          payload: err
        });
      })
      .publishLast()
    ;
    obs.connect();

    return obs;
  }

  createUser(user: MyUserInterface): Observable<MyUser> {
    this.ngRedux.dispatch({ type: UsersActions.CREATE_USER });
    const obs = this.user.create(user)
      .do((result) => {
        this.ngRedux.dispatch({
          type: UsersActions.CREATE_USER_SUCCESS,
          payload: result
        });
      }, (err) => {
        this.ngRedux.dispatch({
          type: UsersActions.CREATE_USER_ERROR,
          payload: err
        });
      })
      .publishLast()
    ;
    obs.connect();

    return obs;
  }
}
