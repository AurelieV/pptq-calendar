import {
  Component, ViewEncapsulation,
  trigger, state, style, transition, animate,
  Input, Output, EventEmitter,
  OnInit, OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { Region }  from '../sdk/models';
import { RegionsActions } from '../actions';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TournamentsFilters } from '../store';
import { TournamentsFiltersActions } from '../actions';

@Component({
  selector: 'filters',
  template: require('./filters.html'),
  styles: [ require('./filters.scss')],
  animations: [
    trigger('flyInOut', [
      state('open', style({transform: 'translateX(0)'})),
      state('void', style({transform: 'translateX(100%)'})),
      transition('void <=> open', [animate(200)])
    ])
  ]
})
export class FiltersComponent implements OnInit {
  @Input() public open: boolean;
  @Output("close") public close_e = new EventEmitter();
  @select() regions$;
  private filters: TournamentsFilters = {
    regionId: null
  };

  constructor(
    private regionsActions: RegionsActions,
    private filtersActions: TournamentsFiltersActions
  ) {}

  ngOnInit() {
    this.regionsActions.fetchRegions();
  }

  get state() {
    return this.open ? 'open' : 'close';
  }

  close() {
    this.filtersActions.set(this.filters);
    this.close_e.emit({});
  }

  onSubmit() {
    this.close();
  }
}
