import { NgModule } from '@angular/core';

import { routing } from './admin.routing';
import { AdminComponent } from './admin.component';
import { CreateTournamentComponent } from './tournaments/createTournament.component';

@NgModule({
  declarations: [
    AdminComponent,
    CreateTournamentComponent
  ],
  imports: [
    routing
  ],
  bootstrap: [ AdminComponent ]
})
export class AdminModule {}
