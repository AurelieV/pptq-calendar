import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { routing } from './admin.routing';
import { AdminComponent } from './admin.component';
import { AdminTournamentsComponent } from './tournaments';
import { AdminRegionsComponent } from './regions';
import { AdminSeasonsComponent } from './seasons';

@NgModule({
  declarations: [
    AdminComponent,
    AdminTournamentsComponent,
    AdminRegionsComponent,
    AdminSeasonsComponent
  ],
  imports: [
    routing,
    CommonModule,
    FormsModule
  ],
  bootstrap: [ AdminComponent ]
})
export class AdminModule {}
