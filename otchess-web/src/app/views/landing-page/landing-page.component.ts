import { Component } from '@angular/core';
import { ChessGameComponent } from '@shared/components/chess-game/chess-game.component';

@Component({
  selector: 'app-landing-page',
  imports: [ChessGameComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
