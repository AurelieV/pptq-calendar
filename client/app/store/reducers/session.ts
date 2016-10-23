import { SessionActions } from '../../actions/session';
import { Session } from '../index';

export function sessionReducer(state: Session = {user: null, roles: []}, action: any) {
  switch (action.type) {
    case SessionActions.LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, {user: null, roles: []});
    case SessionActions.FETCH_USER_SUCCESS:
      return Object.assign({}, state, {user: action.payload});
    case SessionActions.FETCH_ROLES_SUCCESS:
      return Object.assign({}, state, {roles: action.payload});
    default:
      return state;
  }
}
