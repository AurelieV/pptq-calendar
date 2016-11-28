import { RegionsActions } from '../../actions/regions';
import { Region } from '../../sdk/models';

export function regionsReducer(state: Region[] = [], action: any) {
  switch (action.type) {
    case RegionsActions.FETCH_REGIONS_SUCCESS:
      return action.payload;
    case RegionsActions.ADD_REGION_SUCCESS:
      return state.concat(action.payload);
    case RegionsActions.UPDATE_REGION_SUCCESS:
      return state.map((r) => r.id === action.payload.id ? action.payload : r);
    default:
      return state;
  }
}
