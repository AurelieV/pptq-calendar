import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IAppState, rootReducer } from './store';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { LoopBackConfig } from './sdk';
import { SessionEpics } from './login';
import { Subscription } from 'rxjs/Subscription';
const createLogger = require('redux-logger');
import { readCookie } from './utils/cookie';

import { SessionActions } from './actions';

@Component({
  selector: "app-root",
  template: require("./app.html"),
  encapsulation: ViewEncapsulation.None,
  providers: [ SessionEpics ]
})
export class AppComponent {
  private isSidenavOpen: boolean = false;

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
    const accessToken = readCookie('access_token');
    if (accessToken) {
      this.sessionActions.fetchUser();
      this.sessionActions.fetchRoles();
    }
  }
}
