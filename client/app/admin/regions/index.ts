import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { RegionsActions } from '../../actions';
import { Region, RegionInterface } from '../../sdk/models';

@Component({
  template: require('./regions.html')
})
export class RegionsComponent implements OnInit {
  @select()
  private regions$: Observable<Region[]>;
  @ViewChild('regionForm')
  private form: NgForm;
  private regions: Region[];
  private region: RegionInterface = {
    name: ""
  };
  private subscriptions: Subscription[] = [];

  constructor(private regionsActions: RegionsActions) {}

  ngOnInit() {
    this.regions$.subscribe((regions) => this.regions = regions);
    this.regionsActions.fetchRegions();
  }

  onRegionClick(region) {
    if (region.id === this.region.id) return;
    this.resetForm();
    this.region = Object.assign({}, region);
  }

  resetForm() {
    this.form.reset();
    this.region = {
      name: ""
    }
  }

  onSubmit() {
    if (this.region.id) {
      this.regionsActions.updateRegion(this.region)
    } else {
      this.regionsActions.addRegion(this.region);
    }
    this.resetForm();
  }
}
