import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState, TournamentsFilters } from '../store';

@Injectable()
export class TournamentsFiltersActions {
  constructor(private ngRedux: NgRedux<IAppState>) {}

  static SET_FILTERS = 'SET_FILTERS';

  set(filters: TournamentsFilters) {
    this.ngRedux.dispatch({
      type: TournamentsFiltersActions.SET_FILTERS,
      payload: filters
    });
  }
}
