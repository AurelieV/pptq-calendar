import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SeasonsActions, MessagesActions } from '../../actions';
import { Season, SeasonInterface } from '../../sdk/models';

const defaultSeason = {
  name: "",
  format: 'standard',
  startDate: null,
  endDate: null
};
@Component({
  template: require('./seasons.html')
})
export class SeasonsComponent implements OnInit {
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

  constructor(
    private seasonsActions: SeasonsActions,
    private messagesActions: MessagesActions
  ) {}

  ngOnInit() {
    this.seasons$.subscribe((seasons) => this.seasons = seasons);
    this.seasonsActions.fetchSeasons();
  }

  onSeasonClick(season) {
    if (season.id === this.season.id) return;
    this.resetForm();
    this.season = Object.assign({}, season);
  }

  resetForm() {
    this.isErrored = false;
    this.form.reset();
    this.season = Object.assign({}, defaultSeason);
  }

  onSubmit() {
    this.isErrored = false;
    if (this.season.id) {
      this.seasonsActions.updateSeason(this.season)
        .subscribe((s) => {
          this.resetForm();
          const content = `La saison ${s.name} a bien été mise à jour`;
          this.messagesActions.addMessage(content, 'success');
        }, (err) => {
          this.isErrored = true;
        })
      ;
    } else {
      this.seasonsActions.addSeason(this.season)
        .subscribe((s) => {
          this.resetForm();
          const content = `La saison ${s.name} a bien été créée`;
          this.messagesActions.addMessage(content, 'success');
        }, (err) => {
          this.isErrored = true;
        })
      ;
    }
  }
}
