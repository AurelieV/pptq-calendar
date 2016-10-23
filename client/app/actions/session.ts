import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

@Injectable()
export class SessionActions {
  constructor(private ngRedux: NgRedux<IAppState>) {}

  static LOGIN_USER = 'LOGIN_USER';
  static LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
  static LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
  static LOGOUT_USER = 'LOGOUT_USER';
  static LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
  static LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';
  static FETCH_USER = 'FETCH_USER';
  static FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
  static FETCH_USER_ERROR = 'FETCH_USER_ERROR';
  static FETCH_ROLES = 'FETCH_ROLES';
  static FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS';
  static FETCH_ROLES_ERROR = 'FETCH_ROLES_ERROR';

  login(credentials) {
    this.ngRedux.dispatch({
      type: SessionActions.LOGIN_USER,
      payload: credentials,
    });
  }

  logout() {
    this.ngRedux.dispatch({ type: SessionActions.LOGOUT_USER });
  }

  fetchUser() {
    this.ngRedux.dispatch({ type: SessionActions.FETCH_USER });
  }

  fetchRoles() {
    this.ngRedux.dispatch({ type: SessionActions.FETCH_ROLES });
  }
}
