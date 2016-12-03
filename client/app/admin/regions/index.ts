import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { RegionsActions, MessagesActions, UsersActions } from '../../actions';
import { Region, RegionInterface, MyUser } from '../../sdk/models';

@Component({
  template: require('./regions.html')
})
export class RegionsComponent implements OnInit {
  @select()
  private regions$: Observable<Region[]>;
  @select()
  private users$: Observable<MyUser[]>;
  @ViewChild('regionForm')
  private form: NgForm;
  private regions: Region[];
  private region: RegionInterface = {
    name: "",
    captainId: null
  };
  private subscriptions: Subscription[] = [];
  private isErrored: boolean = false;

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

  onRegionClick(region) {
    if (region.id === this.region.id) return;
    this.resetForm();
    this.region = Object.assign({}, region);
  }

  resetForm() {
    this.isErrored = false;
    this.form.reset();
    this.region = {
      name: "",
      captainId: null
    }
  }

  onSubmit() {
    this.isErrored = false;
    if (this.region.id) {
      this.regionsActions.updateRegion(this.region)
        .subscribe((r) => {
          this.resetForm();
          const content = `La région ${r.name} a bien été mise à jour`;
          this.messagesActions.addMessage(content, 'success');
        }, (err) => {
          this.isErrored = true;
        })
      ;
    } else {
      this.regionsActions.addRegion(this.region)
        .subscribe((r) => {
          this.resetForm();
          const content = `La région ${r.name} a bien été créée`;
          this.messagesActions.addMessage(content, 'success');
        }, (err) => {
          this.isErrored = true;
        })
      ;
    }
  }
}
