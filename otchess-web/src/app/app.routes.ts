import { Routes } from '@angular/router';
import { LandingPageComponent } from '@app/views/landing-page/landing-page.component';
import { GameComponent } from '@app/views/game/game.component';
import { LoginComponent } from '@app/views/login/login.component';
import { RegisterComponent } from '@app/views/register/register.component';

export enum UrlEnum {
  HOME = 'home',
  GAME = 'game',
  LOGIN = 'login',
  REGISTER = 'register',
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
    path: '**',
    redirectTo: UrlEnum.HOME,
  },
];
