import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgReduxModule } from 'ng2-redux';
import { HttpModule } from '@angular/http';
import { SDKModule } from './sdk';

import { routing } from './app.routing';

import { TournamentListComponent } from './tournament';
import { LoginComponent } from './login';
import { PageNotFoundComponent } from './utils/404';
import { AppComponent } from './app';
import { MenuComponent } from './menu';
import { SessionActions } from './actions';

require("!style!css!font-awesome/css/font-awesome.min.css");
require("!style!css!sass!./utils/bulma.scss");

@NgModule({
  providers: [ SessionActions ],
  declarations: [
    AppComponent,
    TournamentListComponent,
    LoginComponent,
    PageNotFoundComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    HttpModule,
    SDKModule.forRoot(),
    FormsModule,
    routing
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
