import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { RegionInterface } from '../sdk/models';

@Injectable()
export class RegionsActions {
  constructor(private ngRedux: NgRedux<IAppState>) {}

  static FETCH_REGIONS = 'FETCH_REGIONS';
  static FETCH_REGIONS_SUCCESS = 'FETCH_REGIONS_SUCCESS';
  static FETCH_REGIONS_ERROR = 'FETCH_REGIONS_ERROR';
  static ADD_REGION = 'ADD_REGION';
  static ADD_REGION_SUCCESS = 'ADD_REGION_SUCCESS';
  static ADD_REGION_ERROR = 'ADD_REGION_ERROR';
  static UPDATE_REGION = 'UPDATE_REGION';
  static UPDATE_REGION_SUCCESS = 'UPDATE_REGION_SUCCESS';
  static UPDATE_REGION_ERROR = 'UPDATE_REGION_ERROR';

  fetchRegions() {
    this.ngRedux.dispatch({ type: RegionsActions.FETCH_REGIONS });
  }

  addRegion(region: RegionInterface) {
    this.ngRedux.dispatch({ type: RegionsActions.ADD_REGION, payload: region });
  }

  updateRegion(region: RegionInterface) {
    this.ngRedux.dispatch({ type: RegionsActions.UPDATE_REGION, payload: region });
  }
}
