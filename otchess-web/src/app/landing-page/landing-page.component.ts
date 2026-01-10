import { Component } from '@angular/core';
import { ChessBoardComponent } from '@src/shared/components/chess-board/chess-board.component';

@Component({
  selector: 'app-landing-page',
  imports: [ChessBoardComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  constructor() {}
}
