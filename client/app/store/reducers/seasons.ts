import { SeasonsActions } from '../../actions';
import { Season } from '../../sdk/models';

const moment = require('moment');

const handleDates = (s) => {
  s.startDate = moment.utc(s.startDate).format('YYYY-MM-DD');
  s.endDate = moment.utc(s.endDate).format('YYYY-MM-DD');
};

export function seasonsReducer(state: Season[] = [], action: any) {
  switch (action.type) {
    case SeasonsActions.FETCH_SEASONS_SUCCESS:
      action.payload.forEach(handleDates);
      return action.payload;
    case SeasonsActions.ADD_SEASON_SUCCESS:
      handleDates(action.payload)
      return state.concat(action.payload);
    case SeasonsActions.UPDATE_SEASON_SUCCESS:
      handleDates(action.payload)
      return state.map((s) => s.id === action.payload.id ? action.payload : s);
    default:
      return state;
  }
}
