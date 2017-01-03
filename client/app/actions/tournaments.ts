import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../store';
import { TournamentInterface, Tournament } from '../sdk/models';
import { TournamentApi } from '../sdk/services/custom/Tournament';

@Injectable()
export class TournamentsActions {
  constructor(private ngRedux: NgRedux<IAppState>, private tournament: TournamentApi) {}

  static FETCH_TOURNAMENTS = 'FETCH_TOURNAMENTS';
  static FETCH_TOURNAMENTS_SUCCESS = 'FETCH_TOURNAMENTS_SUCCESS';
  static FETCH_TOURNAMENTS_ERROR = 'FETCH_TOURNAMENTS_ERROR';
  static ADD_TOURNAMENT = 'ADD_TOURNAMENT';
  static ADD_TOURNAMENT_SUCCESS = 'ADD_TOURNAMENT_SUCCESS';
  static ADD_TOURNAMENT_ERROR = 'ADD_TOURNAMENT_ERROR';
  static UPDATE_TOURNAMENT = 'UPDATE_TOURNAMENT';
  static UPDATE_TOURNAMENT_SUCCESS = 'UPDATE_TOURNAMENT_SUCCESS';
  static UPDATE_TOURNAMENT_ERROR = 'UPDATE_TOURNAMENT_ERROR';
  static GET_TOURNAMENT = 'GET_TOURNAMENT';
  static GET_TOURNAMENT_SUCCESS = 'GET_TOURNAMENT_SUCCESS';
  static GET_TOURNAMENT_ERROR = 'GET_TOURNAMENTS_ERROR';

  fetchTournaments(): Observable<Tournament[]> {
    this.ngRedux.dispatch({ type: TournamentsActions.FETCH_TOURNAMENTS });
    const obs = this.tournament.find({
      include: [
        {
          relation: 'headJudge',
          fields: ['id', 'username', 'firstname', 'lastname']
        },
        {
          relation: 'region',
          fields: ['id', 'name']
        },
        {
          relation: 'season',
          fields: ['id', 'name']
        }
      ]
    })
      .do((tournaments) => {
        this.ngRedux.dispatch({
          type: TournamentsActions.FETCH_TOURNAMENTS_SUCCESS,
          payload: tournaments
        });
      }, (err) => {
        this.ngRedux.dispatch({
          type: TournamentsActions.FETCH_TOURNAMENTS_ERROR,
          payload: err
        });
      })
      .publishLast()
    ;
    obs.connect();

    return obs;
  }

  getTournament(id: number): Observable<Tournament> {
    this.ngRedux.dispatch({ type: TournamentsActions.GET_TOURNAMENT });
    const obs = this.tournament.findById(id, {
      include: [
        {
          relation: 'headJudge',
          fields: ['id', 'username', 'firstname', 'lastname']
        },
        {
          relation: 'region',
          fields: ['id', 'name']
        },
        {
          relation: 'season',
          fields: ['id', 'name']
        }
      ]
    })
      .do((tournaments) => {
        this.ngRedux.dispatch({
          type: TournamentsActions.GET_TOURNAMENT_SUCCESS,
          payload: tournaments
        });
      }, (err) => {
        this.ngRedux.dispatch({
          type: TournamentsActions.GET_TOURNAMENT_ERROR,
          payload: err
        });
      })
      .publishLast()
    ;
    obs.connect();

    return obs;
  }

  addTournament(tournament: TournamentInterface): Observable<Tournament> {
    this.ngRedux.dispatch({ type: TournamentsActions.ADD_TOURNAMENT, payload: tournament });
    const obs = this.tournament.create(tournament)
      .do((tournament) => {
        this.ngRedux.dispatch({
          type: TournamentsActions.ADD_TOURNAMENT_SUCCESS,
          payload: tournament
        });
      }, (err) => {
        this.ngRedux.dispatch({
          type: TournamentsActions.ADD_TOURNAMENT_ERROR,
          payload: err
        });
      })
      .publishLast()
    ;
    obs.connect();

    return obs;
  }

  updateTournament(tournament: TournamentInterface): Observable<Tournament> {
    this.ngRedux.dispatch({ type: TournamentsActions.UPDATE_TOURNAMENT, payload: tournament });
    const id = tournament.id;
    let data = Object.assign({}, tournament);
    delete data.id;
    const obs = this.tournament.updateAttributes(id, data)
      .do((tournament) => {
        this.ngRedux.dispatch({
          type: TournamentsActions.UPDATE_TOURNAMENT_SUCCESS,
          payload: tournament
        });
      }, (err) => {
        this.ngRedux.dispatch({
          type: TournamentsActions.UPDATE_TOURNAMENT_ERROR,
          payload: err
        });
      })
      .publishLast()
    ;
    obs.connect();

    return obs;
  }
}
