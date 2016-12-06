import { TournamentsActions } from '../../actions';
import { Tournament } from '../../sdk/models';

const moment = require('moment');

const handleDates = (t) => {
  t.date = moment.utc(t.date).format('YYYY-MM-DD');
};

export function tournamentsReducer(state: Tournament[] = [], action: any) {
  switch (action.type) {
    case TournamentsActions.FETCH_TOURNAMENTS_SUCCESS:
      action.payload.forEach(handleDates);
      return action.payload;
    case TournamentsActions.ADD_TOURNAMENT_SUCCESS:
      handleDates(action.payload)
      return state.concat(action.payload);
    case TournamentsActions.UPDATE_TOURNAMENT_SUCCESS:
      handleDates(action.payload)
      return state.map((s) => s.id === action.payload.id ? action.payload : s);
    default:
      return state;
  }
}
