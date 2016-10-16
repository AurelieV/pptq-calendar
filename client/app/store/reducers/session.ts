import { SessionActions } from '../../actions/session';

export function sessionReducer(state: any = {user: null}, action: any) {
  switch (action.type) {
    case SessionActions.LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, {user: null});
    case SessionActions.FETCH_USER_SUCCESS:
      return Object.assign({}, state, {user: action.payload});
    default:
      return state;
  }
}
