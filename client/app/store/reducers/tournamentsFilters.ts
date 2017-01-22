import { TournamentsFiltersActions } from '../../actions';
import { TournamentsFilters } from '../../store';

const defaultState = {
  regionId: null
};

export function tournamentsFiltersReducer(state: TournamentsFilters = defaultState, action: any) {
  switch (action.type) {
    case TournamentsFiltersActions.SET_FILTERS:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
