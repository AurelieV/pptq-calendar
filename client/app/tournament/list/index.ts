import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TournamentsActions } from '../../actions';
import { TournamentsFilters } from '../../store';
import { Tournament } from '../../sdk/models';
const moment = require('moment');
const _ = require('lodash');

interface Week {
  m: any;
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
  private tournaments: Tournament[];
  @select('tournamentsFilters')
  private filters$: Observable<TournamentsFilters>;
  private filters: TournamentsFilters;
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
    this.subscriptions.push(this.tournaments$.subscribe(tournaments => {
      this.tournaments = tournaments;
      this.updateWeeks();
    }));
    this.subscriptions.push(this.session$.subscribe((s) => {
      const roles = s.roles;
      if (!roles) return;
      this.isAdmin = roles && (roles.indexOf('admin') > -1 || roles.indexOf('judge') > -1);
    }));
    this.subscriptions.push(this.filters$.subscribe(filters => {
      this.filters = filters;
      this.updateWeeks();
    }));
    this.tournamentsActions.fetchTournaments();
  }

  updateWeeks() {
    let tmp = this.tournaments;
    if (this.filters) {
      tmp = tmp.filter(t => this.filters.regionId === null || t.regionId === this.filters.regionId)
    }
    tmp = _.groupBy(tmp, (t) => moment.utc(t.date).format('YYYY-W'));
    let byWeek = [];
    Object.keys(tmp).forEach(w => {
      const m = moment(w, 'YYYY-W');
      byWeek.push({
        m,
        week: {
          start: m.startOf('week').format('DD MMM'),
          end: m.endOf('week').format('DD MMM')
        },
        days: this.groupByDay(tmp[w], w)
      });
    });
    this.weeks = byWeek.sort((a, b) => {
      if (a.m.isSame(b.m)) {
        return 0;
      }
      return a.m.isBefore(b.m) ? -1 : 1;
    });
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
