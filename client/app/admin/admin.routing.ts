import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Components
import { AdminTournamentsComponent } from './tournaments';
import { AdminRegionsComponent } from "./regions";
import { AdminSeasonsComponent } from "./seasons";
import { AdminComponent } from './admin.component';

// Guard
import { AdminGuard, JudgeGuard } from "../guards";

const adminRoutes: Routes = [
  {
    path: 'admin',
    data: {
      title: "Administration"
    },
    component: AdminComponent,
    children: [
      { path: 'tournaments', component: AdminTournamentsComponent, canActivate: [JudgeGuard] },
      { path: 'regions', component: AdminRegionsComponent, canActivate: [AdminGuard] },
      { path: 'seasons', component: AdminSeasonsComponent, canActivate: [AdminGuard] },
      { path: '', redirectTo: 'tournaments', pathMatch: 'full' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(adminRoutes);
