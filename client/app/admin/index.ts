import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { routing } from './admin.routing';
import { AdminComponent } from './admin.component';
import { CreateTournamentComponent } from './tournaments';
import { RegionsComponent } from './regions';
import { SeasonsComponent } from './seasons';

@NgModule({
  declarations: [
    AdminComponent,
    CreateTournamentComponent,
    RegionsComponent,
    SeasonsComponent
  ],
  imports: [
    routing,
    CommonModule,
    FormsModule
  ],
  bootstrap: [ AdminComponent ]
})
export class AdminModule {}
