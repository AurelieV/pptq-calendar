import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Components
import { CreateTournamentComponent } from './tournaments';
import { RegionsComponent } from "./regions";
import { SeasonsComponent } from "./seasons";
import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    data: {
      title: "Administration"
    },
    component: AdminComponent,
    children: [
      { path: 'create-tournament', component: CreateTournamentComponent },
      { path: 'regions', component: RegionsComponent },
      { path: 'seasons', component: SeasonsComponent },
      { path: '', redirectTo: 'create-tournament', pathMatch: 'full' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(adminRoutes);
