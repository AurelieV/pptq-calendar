import { Component, ViewEncapsulation } from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
const createLogger = require('redux-logger');
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import { LoopBackConfig } from './sdk';
import { readCookie } from './utils/cookie';
import { IAppState, rootReducer } from './store';
import { SessionActions } from './actions';

// Epics
import { SessionEpics } from './login';

const moment = require('moment');

@Component({
  selector: "app-root",
  template: require("./app.html"),
  styles: [ require("./app.scss") ],
  encapsulation: ViewEncapsulation.None,
  providers: [ SessionEpics ]
})
export class AppComponent {
  private isSidenavOpen: boolean = false;
  private title: string;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private sessionEpics: SessionEpics,
    private sessionActions: SessionActions,

    // needed for angulary
    private router: Router) {

    const rootEpic = combineEpics(
      ...this.sessionEpics.getEpics()
    );

    this.ngRedux.configureStore(
      rootReducer,
      {},
      [ createLogger(), createEpicMiddleware(rootEpic) ],
      [ devTool.isEnabled() ? devTool.enhancer() : f => f]);

      LoopBackConfig.setBaseURL('');
      LoopBackConfig.setApiVersion('api');
  }

  ngOnInit() {
    moment.locale('fr');
    const accessToken = readCookie('access_token');
    if (accessToken) {
      this.sessionActions.fetchUser();
      this.sessionActions.fetchRoles();
    } else {
      this.sessionActions.setNoUser();
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.title = this.getDeepestTitle(this.router.routerState.snapshot.root);
      }
    });
  }

  private getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title = routeSnapshot.data ? routeSnapshot.data['title'] : '';
    if (routeSnapshot.firstChild) {
      title = this.getDeepestTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }
}
