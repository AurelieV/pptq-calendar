import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgReduxModule } from 'ng2-redux';
import { HttpModule } from '@angular/http';
import { SDKModule } from './sdk';

import { routing } from './app.routing';

// Components
import { TournamentListComponent } from './tournament';
import { LoginComponent } from './login';
import { PageNotFoundComponent } from './utils/404';
import { AppComponent } from './app';
import { MenuComponent } from './menu';
import { SessionActions, RegionsActions } from './actions';
import { MyProfileComponent } from './myProfile';

// Modules
import { AdminModule } from './admin';

// Guards
import { AuthGuard } from './guards';

require("!style!css!font-awesome/css/font-awesome.min.css");
require("!style!css!sass!./utils/styles/bulma.sass");

@NgModule({
  providers: [ SessionActions, RegionsActions, AuthGuard ],
  declarations: [
    AppComponent,
    TournamentListComponent,
    LoginComponent,
    PageNotFoundComponent,
    MenuComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    HttpModule,
    SDKModule.forRoot(),
    FormsModule,
    routing,
    AdminModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
