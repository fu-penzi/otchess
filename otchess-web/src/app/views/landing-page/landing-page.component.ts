import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/list';
import { IconFabComponent } from '@shared/components/icon-fab/icon-fab.component';

@Component({
  selector: 'app-landing-page',
  imports: [MatIcon, MatCardModule, MatButtonModule, MatDivider, IconFabComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
