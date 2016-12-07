import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TournamentsActions } from '../../actions';
import { Tournament } from '../../sdk/models';
const moment = require('moment');

interface Day {
  date: string;
  tournaments: Tournament[];
}

@Component({
  template: require('./list.html'),
  styles: [ require('./list.scss') ]
})
export class TournamentListComponent implements OnInit, OnDestroy {
  @select()
  private tournaments$: Observable<Tournament[]>;
  private tournaments: Tournament[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private tournamentsActions: TournamentsActions) {}

  ngOnInit() {
    this.subscriptions.push(this.tournaments$.subscribe((tournaments) => {
      this.tournaments = tournaments;
    }));
    this.tournamentsActions.fetchTournaments();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

}
