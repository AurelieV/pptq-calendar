import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
const createLogger = require('redux-logger');
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { HttpModule } from '@angular/http';
import { SDKBrowserModule } from './sdk/index';
import { LoopBackConfig } from './sdk';

import { routing } from './app.routing';
import { IAppState, rootReducer } from './store';

// Components
import { TournamentListComponent, TournamentDetailComponent } from './tournament';
import { LoginComponent } from './login';
import { PageNotFoundComponent } from './utils/404';
import { AppComponent } from './app';
import { MenuComponent } from './menu';
import { MyProfileComponent } from './myProfile';
import { MessagesComponent } from './messages';
import { RegisterComponent } from './register';
import { VerificationComponent } from './register/verification';
import { FiltersComponent } from './filters';

// Epics
import { SessionEpics } from './login';

// Services
import {
  SessionActions,
  RegionsActions,
  MessagesActions,
  UsersActions,
  SeasonsActions,
  TournamentsActions,
  TournamentsFiltersActions
} from './actions';

// Modules
import { AdminModule } from './admin';

// Guards
import { AuthGuard, AdminGuard, JudgeGuard } from './guards';

require("!style!css!font-awesome/css/font-awesome.min.css");
require("!style!css!sass!./utils/styles/bulma.sass");

@NgModule({
  imports: [
    BrowserModule,
    NgReduxModule.forRoot(),
    HttpModule,
    SDKBrowserModule.forRoot(),
    FormsModule,
    routing,
    AdminModule
  ],
  providers: [
    SessionActions,
    RegionsActions,
    MessagesActions,
    UsersActions,
    SeasonsActions,
    TournamentsActions,
    TournamentsFiltersActions,
    AuthGuard,
    AdminGuard,
    JudgeGuard,
    SessionEpics
  ],
  declarations: [
    AppComponent,
    TournamentListComponent,
    TournamentDetailComponent,
    LoginComponent,
    PageNotFoundComponent,
    MenuComponent,
    MyProfileComponent,
    MessagesComponent,
    RegisterComponent,
    VerificationComponent,
    FiltersComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
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

      LoopBackConfig.setBaseURL('');
      LoopBackConfig.setApiVersion('api');
  }
}
