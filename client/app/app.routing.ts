import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Components
import { TournamentListComponent } from './tournament';
import { LoginComponent } from './login';
import { MyProfileComponent } from './myProfile';
import { RegisterComponent } from './register';
import { VerificationComponent } from './register/verification';
import { PageNotFoundComponent } from './utils/404';

// Guards
import { AuthGuard } from './guards';

const appRoutes: Routes = [
  { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
  {
    path: 'tournaments',
    component: TournamentListComponent,
    data: {
      title: 'Tournois'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Connexion'
    }
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    data: {
      title: 'Profil'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'verification',
    component: VerificationComponent,
    data: {
      title: 'Compte activé'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Inscription'
    }
  },
  { path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
