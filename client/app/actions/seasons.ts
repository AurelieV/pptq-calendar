import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../store';
import { SeasonInterface, Season } from '../sdk/models';
import { SeasonApi } from '../sdk/services/custom/Season';

@Injectable()
export class SeasonsActions {
  constructor(private ngRedux: NgRedux<IAppState>, private season: SeasonApi) {}

  static FETCH_SEASONS = 'FETCH_SEASONS';
  static FETCH_SEASONS_SUCCESS = 'FETCH_SEASONS_SUCCESS';
  static FETCH_SEASONS_ERROR = 'FETCH_SEASONS_ERROR';
  static ADD_SEASON = 'ADD_SEASON';
  static ADD_SEASON_SUCCESS = 'ADD_SEASON_SUCCESS';
  static ADD_SEASON_ERROR = 'ADD_SEASON_ERROR';
  static UPDATE_SEASON = 'UPDATE_SEASON';
  static UPDATE_SEASON_SUCCESS = 'UPDATE_SEASON_SUCCESS';
  static UPDATE_SEASON_ERROR = 'UPDATE_SEASON_ERROR';

  fetchSeasons(): Observable<Season[]> {
    this.ngRedux.dispatch({ type: SeasonsActions.FETCH_SEASONS });
    const obs = this.season.find()
      .do((seasons) => {
        this.ngRedux.dispatch({
          type: SeasonsActions.FETCH_SEASONS_SUCCESS,
          payload: seasons
        });
      }, (err) => {
        this.ngRedux.dispatch({
          type: SeasonsActions.FETCH_SEASONS_ERROR,
          payload: err
        });
      })
      .publishLast()
    ;
    obs.connect();

    return obs;
  }

  addSeason(season: SeasonInterface): Observable<Season> {
    this.ngRedux.dispatch({ type: SeasonsActions.ADD_SEASON, payload: season });
    const obs = this.season.create(season)
      .do((season) => {
        this.ngRedux.dispatch({
          type: SeasonsActions.ADD_SEASON_SUCCESS,
          payload: season
        });
      }, (err) => {
        this.ngRedux.dispatch({
          type: SeasonsActions.ADD_SEASON_ERROR,
          payload: err
        });
      })
      .publishLast()
    ;
    obs.connect();

    return obs;
  }

  updateSeason(season: SeasonInterface): Observable<Season> {
    this.ngRedux.dispatch({ type: SeasonsActions.UPDATE_SEASON, payload: season });
    const id = season.id;
    let data = Object.assign({}, season);
    delete data.id;
    const obs = this.season.updateAttributes(id, data)
      .do((season) => {
        this.ngRedux.dispatch({
          type: SeasonsActions.UPDATE_SEASON_SUCCESS,
          payload: season
        });
      }, (err) => {
        this.ngRedux.dispatch({
          type: SeasonsActions.UPDATE_SEASON_ERROR,
          payload: err
        });
      })
      .publishLast()
    ;
    obs.connect();

    return obs;
  }
}
