import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SeasonsActions, MessagesActions } from '../../actions';
import { Season, SeasonInterface } from '../../sdk/models';

const defaultSeason = {
  name: '',
  format: '',
  startDate: null,
  endDate: null
};
@Component({
  template: require('./seasons.html')
})
export class AdminSeasonsComponent implements OnInit {
  @select()
  private seasons$: Observable<Season[]>;
  @ViewChild('seasonForm')
  private form: NgForm;
  private seasons: Season[];
  private season: SeasonInterface = Object.assign({}, defaultSeason);
  private subscriptions: Subscription[] = [];
  private isErrored: boolean = false;
  private formats: any[] = [
    {key: 'standard', name: "Standard"},
    {key: 'modern', name: "Modern"}
  ]
  private showForm: boolean = true;

  constructor(
    private seasonsActions: SeasonsActions,
    private messagesActions: MessagesActions
  ) {}

  ngOnInit() {
    this.seasons$.subscribe((seasons) => this.seasons = seasons);
    this.seasonsActions.fetchSeasons();
  }

  onSeasonClick(season: Season) {
    if (season.id === this.season.id) return;
    this.resetForm(season);
  }

  resetForm(season: SeasonInterface) {
    this.isErrored = false;
    this.form.reset();
    this.season = Object.assign({}, season);
    this.showForm = false;
    setTimeout(() => this.showForm = true, 0);
  }

  onSubmit() {
    this.isErrored = false;
    if (this.season.id) {
      this.seasonsActions.updateSeason(this.season)
        .subscribe((s) => {
          this.resetForm(defaultSeason);
          const content = `La saison ${s.name} a bien été mise à jour`;
          this.messagesActions.addMessage(content, 'success');
        }, (err) => {
          this.isErrored = true;
        })
      ;
    } else {
      this.seasonsActions.addSeason(this.season)
        .subscribe((s) => {
          this.resetForm(defaultSeason);
          const content = `La saison ${s.name} a bien été créée`;
          this.messagesActions.addMessage(content, 'success');
        }, (err) => {
          this.isErrored = true;
        })
      ;
    }
  }

  cancel() {
    this.resetForm(defaultSeason);
  }
}
