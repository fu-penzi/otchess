import { Routes } from '@angular/router';
import { LandingPageComponent } from '@app/views/landing-page/landing-page.component';
import { GameComponent } from '@app/views/game/game.component';

export const routes: Routes = [
  {
    component: LandingPageComponent,
    path: '',
  },
  {
    component: GameComponent,
    path: 'game',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
