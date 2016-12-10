import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TournamentsActions, RegionsActions, SeasonsActions, MessagesActions } from '../../actions';
import { Tournament, TournamentInterface, Region, Season } from '../../sdk/models';

const defaultTournament = {
  town: '',
  format: '',
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
  template: require('./tournaments.html')
})
export class AdminTournamentsComponent implements OnInit, OnDestroy {
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
  private showForm: boolean = true;
  private id: number = null;

  constructor(
    private tournamentsActions: TournamentsActions,
    private regionsActions: RegionsActions,
    private seasonsActions: SeasonsActions,
    private messagesActions: MessagesActions,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.push(this.tournaments$.subscribe((tournaments) => {
      this.tournaments = tournaments;
      this.updateForm();
    }));
    this.subscriptions.push(this.route.params.subscribe((p) => {
      this.id = +p['id'] || null;
      this.updateForm();
    }));
    this.tournamentsActions.fetchTournaments();
    this.regionsActions.fetchRegions();
    this.seasonsActions.fetchSeasons();
  }

  updateForm() {
    if (!this.id && !this.tournament.id) return;
    if (!this.id) {
      this.resetForm(defaultTournament);
      return;
    }
    if (this.id === this.tournament.id) return;
    const tournament = this.tournaments.find((t) => t.id === this.id);
    if (!tournament) {
      this.resetForm(defaultTournament);
    }
    this.resetForm(tournament);
  }

  resetForm(tournament: TournamentInterface) : void {
    this.isErrored = false;
    if (this.form) this.form.reset();
    this.tournament = Object.assign({}, tournament);
    this.showForm = false;
    setTimeout(() => this.showForm = true, 0);
  }

  onSubmit() {
    this.isErrored = false;
    if (this.tournament.id) {
      this.tournamentsActions.updateTournament(this.tournament)
        .subscribe((s) => {
          this.resetForm(defaultTournament);
          const content = `Le tournoi a bien été mis à jour`;
          this.messagesActions.addMessage(content, 'success');
        }, (err) => {
          this.isErrored = true;
        })
      ;
    } else {
      this.tournamentsActions.addTournament(this.tournament)
        .subscribe((s) => {
          this.resetForm(defaultTournament);
          const content = `Le tournoi a bien été créé`;
          this.messagesActions.addMessage(content, 'success');
        }, (err) => {
          this.isErrored = true;
        })
      ;
    }
  }

  cancel() {
    this.router.navigate(['./', {}], { relativeTo: this.route })
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
