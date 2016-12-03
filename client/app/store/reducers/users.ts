import { UsersActions } from '../../actions';
import { MyUser } from '../../sdk/models';

export function usersReducer(state: MyUser[] = [], action: any) {
  switch (action.type) {
    case UsersActions.FETCH_USERS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
