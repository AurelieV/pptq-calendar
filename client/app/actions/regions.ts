import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../store';
import { RegionInterface, Region } from '../sdk/models';
import { RegionApi } from '../sdk/services/custom/Region';

@Injectable()
export class RegionsActions {
  constructor(private ngRedux: NgRedux<IAppState>, private region: RegionApi) {}

  static FETCH_REGIONS = 'FETCH_REGIONS';
  static FETCH_REGIONS_SUCCESS = 'FETCH_REGIONS_SUCCESS';
  static FETCH_REGIONS_ERROR = 'FETCH_REGIONS_ERROR';
  static ADD_REGION = 'ADD_REGION';
  static ADD_REGION_SUCCESS = 'ADD_REGION_SUCCESS';
  static ADD_REGION_ERROR = 'ADD_REGION_ERROR';
  static UPDATE_REGION = 'UPDATE_REGION';
  static UPDATE_REGION_SUCCESS = 'UPDATE_REGION_SUCCESS';
  static UPDATE_REGION_ERROR = 'UPDATE_REGION_ERROR';

  fetchRegions(): Observable<Region[]> {
    this.ngRedux.dispatch({ type: RegionsActions.FETCH_REGIONS });
    const obs = this.region.find()
      .do((regions) => {
        this.ngRedux.dispatch({
          type: RegionsActions.FETCH_REGIONS_SUCCESS,
          payload: regions
        });
      }, (err) => {
        this.ngRedux.dispatch({
          type: RegionsActions.FETCH_REGIONS_ERROR,
          payload: err
        });
      })
      .publishLast()
    ;
    obs.connect();

    return obs;
  }

  addRegion(region: RegionInterface): Observable<Region> {
    this.ngRedux.dispatch({ type: RegionsActions.ADD_REGION, payload: region });
    const obs = this.region.create(region)
      .do((region) => {
        this.ngRedux.dispatch({
          type: RegionsActions.ADD_REGION_SUCCESS,
          payload: region
        });
      }, (err) => {
        this.ngRedux.dispatch({
          type: RegionsActions.ADD_REGION_ERROR,
          payload: err
        });
      })
      .publishLast()
    ;
    obs.connect();

    return obs;
  }

  updateRegion(region: RegionInterface): Observable<Region> {
    this.ngRedux.dispatch({ type: RegionsActions.UPDATE_REGION, payload: region });
    const id = region.id;
    let data = Object.assign({}, region);
    delete data.id;
    const obs = this.region.updateAttributes(id, data)
      .do((region) => {
        this.ngRedux.dispatch({
          type: RegionsActions.UPDATE_REGION_SUCCESS,
          payload: region
        });
      }, (err) => {
        this.ngRedux.dispatch({
          type: RegionsActions.UPDATE_REGION_ERROR,
          payload: err
        });
      })
      .publishLast()
    ;
    obs.connect();

    return obs;
  }
}
