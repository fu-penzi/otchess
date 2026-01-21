import { Component } from '@angular/core';
import { ChessGameComponent } from '@shared/components/chess-game/chess-game.component';

@Component({
  selector: 'app-game',
  imports: [ChessGameComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {}
