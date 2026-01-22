import { Routes } from '@angular/router';
import { LandingPageComponent } from '@app/views/landing-page/landing-page.component';
import { GameComponent } from '@app/views/game/game.component';
import { LoginComponent } from '@app/views/login/login.component';
import { RegisterComponent } from '@app/views/register/register.component';
import { ProfileComponent } from '@app/views/profile/profile.component';
import { LeaderboardsComponent } from '@app/views/leaderboards/leaderboards.component';

export enum UrlEnum {
  HOME = 'home',
  GAME = 'game',
  LOGIN = 'login',
  REGISTER = 'register',
  LEADERBOARDS = 'leaderboards',
  PROFILE = 'user/:username',
}

export const routes: Routes = [
  {
    component: LandingPageComponent,
    path: UrlEnum.HOME,
  },
  {
    component: GameComponent,
    path: UrlEnum.GAME,
  },
  {
    component: LoginComponent,
    path: UrlEnum.LOGIN,
  },
  {
    component: RegisterComponent,
    path: UrlEnum.REGISTER,
  },
  {
    path: UrlEnum.PROFILE,
    component: ProfileComponent,
  },
  {
    path: UrlEnum.LEADERBOARDS,
    component: LeaderboardsComponent,
  },
  {
    path: '**',
    redirectTo: UrlEnum.HOME,
  },
];
