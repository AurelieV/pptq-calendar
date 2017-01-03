import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';

import { TournamentsActions } from '../../actions';
import { Tournament } from '../../sdk/models';

@Component({
  template: require('./detail.html'),
  styles: [ require('./detail.scss') ]
})
export class TournamentDetailComponent implements OnInit, OnDestroy {
  private tournament: Tournament;
  private notFound: boolean = false;
  private subscriptions: Subscription[] = [];
  private isAdmin: boolean = false;
  @select(['session', 'roles'])
  private roles: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private tournamentsActions: TournamentsActions
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      if (!id && id !== 0) {
        this.notFound = true;
      };
      this.tournamentsActions.getTournament(id).subscribe(
        (tournament) => {
          this.notFound = false;
          this.tournament = tournament;
        }, (err) => {
          this.notFound = true;
      });
    });
    this.subscriptions.push(this.roles.subscribe((roles) => {
      this.isAdmin = roles.indexOf('admin') > -1;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
