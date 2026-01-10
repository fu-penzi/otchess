import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  {
    component: LandingPageComponent,
    path: '',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
