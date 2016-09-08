import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { TournamentListComponent } from './tournament';
import { LoginComponent } from './login';
import { PageNotFoundComponent } from './utils/404';

const appRoutes: Routes = [
  { path: '', component: TournamentListComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
