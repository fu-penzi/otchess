import { Component } from '@angular/core';
import { ChessGameComponent } from '@shared/components/chess-game/chess-game.component';
import { ChessMovesComponent } from '@app/views/game/chess-moves/chess-moves.component';

@Component({
  selector: 'app-game',
  imports: [ChessGameComponent, ChessMovesComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {}
