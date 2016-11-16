import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Components
import { TournamentListComponent } from './tournament';
import { LoginComponent } from './login';
import { MyProfileComponent } from './myProfile';
import { PageNotFoundComponent } from './utils/404';

// Guards
import { AuthGuard } from './guards';

const appRoutes: Routes = [
  { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
  { path: 'tournaments', component: TournamentListComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
