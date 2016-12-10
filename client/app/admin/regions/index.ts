import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { RegionsActions, MessagesActions, UsersActions } from '../../actions';
import { Region, RegionInterface, MyUser } from '../../sdk/models';

const defaultRegion = {
  id: null,
  name: '',
  captainId: null
};

@Component({
  template: require('./regions.html')
})
export class AdminRegionsComponent implements OnInit {
  @select()
  private regions$: Observable<Region[]>;
  @select()
  private users$: Observable<MyUser[]>;
  @ViewChild('regionForm')
  private form: NgForm;
  private regions: Region[];
  private region: RegionInterface = Object.assign({}, defaultRegion);
  private subscriptions: Subscription[] = [];
  private isErrored: boolean = false;
  private showForm: boolean = true;

  constructor(
    private regionsActions: RegionsActions,
    private messagesActions: MessagesActions,
    private usersActions: UsersActions
  ) {}

  ngOnInit() {
    this.regions$.subscribe((regions) => this.regions = regions);
    this.regionsActions.fetchRegions();
    this.usersActions.fetchUsers();
  }

  onRegionClick(region: Region) {
    if (region.id === this.region.id) return;
    this.resetForm(region);
  }

  resetForm(region: RegionInterface) {
    this.isErrored = false;
    this.form.reset();
    this.region = Object.assign({}, region);
    this.showForm = false;
    setTimeout(() => this.showForm = true, 0);
  }

  onSubmit() {
    this.isErrored = false;
    if (this.region.id) {
      this.regionsActions.updateRegion(this.region)
        .subscribe((r) => {
          this.resetForm(defaultRegion);
          const content = `La région ${r.name} a bien été mise à jour`;
          this.messagesActions.addMessage(content, 'success');
        }, (err) => {
          this.isErrored = true;
        })
      ;
    } else {
      this.regionsActions.addRegion(this.region)
        .subscribe((r) => {
          this.resetForm(defaultRegion);
          const content = `La région ${r.name} a bien été créée`;
          this.messagesActions.addMessage(content, 'success');
        }, (err) => {
          this.isErrored = true;
        })
      ;
    }
  }

  cancel() {
    this.resetForm(defaultRegion);
  }
}
