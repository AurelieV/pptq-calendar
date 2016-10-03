import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app.routing';

import { TournamentListComponent } from './tournament';
import { LoginComponent } from './login';
import { PageNotFoundComponent } from './utils/404';
import { AppComponent } from './app';
import { MenuComponent } from './menu';

require("!style!css!font-awesome/css/font-awesome.min.css");
require("!style!css!sass!./utils/bulma.scss");

@NgModule({
  providers: [],
  declarations: [
    AppComponent,
    TournamentListComponent,
    LoginComponent,
    PageNotFoundComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
