import { Routes } from '@angular/router';
import { LandingPageComponent } from '@app/views/landing-page/landing-page.component';

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
