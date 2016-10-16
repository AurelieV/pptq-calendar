import { Component, ViewEncapsulation } from '@angular/core';
import { IAppState, rootReducer } from './store';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { SessionEpics } from './login';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
const createLogger = require('redux-logger');

@Component({
  selector: "app-root",
  template: require("./app.html"),
  encapsulation: ViewEncapsulation.None,
  providers: [ SessionEpics ]
})
export class AppComponent {
  private isSidenavOpen: boolean = false;
  @select()
  private session$: Observable<any>;
  private username: any = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private sessionEpics: SessionEpics) {

    const rootEpic = combineEpics(
      ...this.sessionEpics.getEpics()
    );

    this.ngRedux.configureStore(
      rootReducer,
      {},
      [ createLogger(), createEpicMiddleware(rootEpic) ],
      [ devTool.isEnabled() ? devTool.enhancer() : f => f]);
  }

  ngOnInit() {
    this.subscriptions.push(this.session$.subscribe((s) => {
      this.username = s.user ? s.user.username : null;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => { s.unsubscribe(); })
  }
}
