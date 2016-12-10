import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Components
import { AdminTournamentsComponent } from './tournaments';
import { AdminRegionsComponent } from "./regions";
import { AdminSeasonsComponent } from "./seasons";
import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    data: {
      title: "Administration"
    },
    component: AdminComponent,
    children: [
      { path: 'create-tournament', component: AdminTournamentsComponent },
      { path: 'regions', component: AdminRegionsComponent },
      { path: 'seasons', component: AdminSeasonsComponent },
      { path: '', redirectTo: 'create-tournament', pathMatch: 'full' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(adminRoutes);
