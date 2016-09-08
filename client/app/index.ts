import { NgModule } from '@angular/core';

import { routing } from './app.routing';

import { TournamentListComponent } from './tournament';
import { LoginComponent } from './login';
import { PageNotFoundComponent } from './utils/404';

require("!style!css!font-awesome/css/font-awesome.min.css");
require("!style!css!sass!./utils/bulma.scss");

@NgModule({
  providers: [],
  declarations: [
    TournamentListComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    routing
  ],
})
export default class AppModule {}
