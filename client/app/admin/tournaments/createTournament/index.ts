import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TournamentsActions, RegionsActions, SeasonsActions, MessagesActions } from '../../../actions';
import { Tournament, TournamentInterface, Region, Season } from '../../../sdk/models';

const defaultTournament = {
  town: '',
  format: 'standard',
  date: null,
  isDateConfirmed: false,
  organizer: '',
  information: '',
  phoneContact: '',
  emailContact: '',
  adress: '',
  googleId: '',
  headJudgeId: null,
  regionId: null,
  seasonId: null
};

@Component({
  selector: 'create-tournament',
  template: require('./createTournament.html')
})
export class CreateTournamentComponent implements OnInit, OnDestroy {
  @select()
  private tournaments$: Observable<Tournament[]>;
  @select()
  private seasons$: Observable<Season[]>;
  @select()
  private regions$: Observable<Region[]>;
  @ViewChild('tournamentForm')
  private form: NgForm;
  private tournaments: Tournament[];
  private tournament: TournamentInterface = Object.assign({}, defaultTournament);
  private subscriptions: Subscription[] = [];
  private isErrored: boolean = false;
  private formats: any[] = [
    {key: 'standard', name: "Standard"},
    {key: 'modern', name: "Modern"},
    {key: 'sealed', name: "Scellé"}
  ]

  constructor(
    private tournamentsActions: TournamentsActions,
    private regionsActions: RegionsActions,
    private seasonsActions: SeasonsActions,
    private messagesActions: MessagesActions
  ) {}

  ngOnInit() {
    this.subscriptions.push(this.tournaments$.subscribe((tournaments) =>
      this.tournaments = tournaments
    ));
    this.tournamentsActions.fetchTournaments();
    this.regionsActions.fetchRegions();
    this.seasonsActions.fetchSeasons();
  }

  onTournamentClick(tournament) {
    if (tournament.id === this.tournament.id) return;
    this.resetForm();
    this.tournament = Object.assign({}, tournament);
  }

  resetForm() {
    this.isErrored = false;
    this.form.reset();
    this.tournament = Object.assign({}, defaultTournament);
  }

  onSubmit() {
    this.isErrored = false;
    if (this.tournament.id) {
      this.tournamentsActions.updateTournament(this.tournament)
        .subscribe((s) => {
          this.resetForm();
          const content = `Le tournoi a bien été mis à jour`;
          this.messagesActions.addMessage(content, 'success');
        }, (err) => {
          this.isErrored = true;
        })
      ;
    } else {
      this.tournamentsActions.addTournament(this.tournament)
        .subscribe((s) => {
          this.resetForm();
          const content = `Le tournoi a bien été créé`;
          this.messagesActions.addMessage(content, 'success');
        }, (err) => {
          this.isErrored = true;
        })
      ;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
