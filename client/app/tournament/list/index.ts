import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TournamentsActions } from '../../actions';
import { Tournament } from '../../sdk/models';
const moment = require('moment');
const _ = require('lodash');

interface Week {
  week: string;
  days: Day[];
}
interface Day {
  day: string;
  tournaments: Tournament[];
}

@Component({
  template: require('./list.html'),
  styles: [ require('./list.scss') ]
})
export class TournamentListComponent implements OnInit, OnDestroy {
  @select()
  private tournaments$: Observable<Tournament[]>;
  private weeks: Week[] = [];
  private subscriptions: Subscription[] = [];
  private isAdmin: boolean = false;
  @select() private session$: Observable<any>;

  constructor(
    private tournamentsActions: TournamentsActions,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscriptions.push(this.tournaments$.subscribe((tournaments) => {
      const tmp = _.groupBy(tournaments, (t) => moment.utc(t.date).format('YYYY-W'));
      let byWeek = [];
      Object.keys(tmp).forEach((w) => {
        const m = moment(w, 'YYYY-W');
        byWeek.push({
          week: {
            start: m.startOf('week').format('DD MMM'),
            end: m.endOf('week').format('DD MMM')
          },
          days: this.groupByDay(tmp[w], w)
        });
      });
      this.weeks = byWeek;
    }));
    this.subscriptions.push(this.session$.subscribe((s) => {
      const roles = s.roles;
      if (!roles) return;
      this.isAdmin = roles.indexOf('admin') > -1;
    }));
    this.tournamentsActions.fetchTournaments();
  }

  groupByDay(tab: any[], week: string) {
    let tmp = _.groupBy(tab, (t) => moment.utc(t.date).format('E'));
    tmp = Object.assign({'6': [], '7': []}, tmp);
    let result = [];
    Object.keys(tmp).forEach((d) => {
      result.push({
        day: moment.utc(`${week}-${d}`, 'YYYY-W-E').format('dddd DD MMM'),
        tournaments: tmp[d]
      });
    });

    return result;
  }

  goToDetail(id: number) {
    this.router.navigate(['../tournament', id], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

}
