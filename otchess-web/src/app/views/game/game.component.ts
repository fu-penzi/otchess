import { Component } from '@angular/core';
import { ChessMovesComponent } from '@app/views/game/chess-moves/chess-moves.component';
import { PlayerInfoComponent } from '@app/views/game/player-info/player-info.component';
import { ChessBoardComponent } from '@app/views/game/chess-board/chess-board.component';

@Component({
  selector: 'app-game',
  imports: [ChessMovesComponent, PlayerInfoComponent, ChessBoardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {}
