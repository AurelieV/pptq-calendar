import { SessionActions } from '../../actions/session';
import { Session } from '../index';

export function sessionReducer(state: Session = {user: undefined, roles: undefined}, action: any) {
  switch (action.type) {
    case SessionActions.LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, {user: null, roles: []});
    case SessionActions.FETCH_USER_SUCCESS:
      return Object.assign({}, state, {user: action.payload});
    case SessionActions.FETCH_ROLES_SUCCESS:
      return Object.assign({}, state, {roles: action.payload});
    case SessionActions.SET_NO_USER:
      return Object.assign({}, state, {roles: [], user: null});
    default:
      return state;
  }
}
