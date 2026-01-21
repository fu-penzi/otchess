import { Component } from '@angular/core';
import { ChessBoardComponent } from '@shared/components/chess-game/chess-board/chess-board.component';
import { PlayerInfoComponent } from '@shared/components/chess-game/player-info/player-info.component';

@Component({
  selector: 'app-chess-game',
  imports: [PlayerInfoComponent, ChessBoardComponent],
  templateUrl: './chess-game.component.html',
  styleUrl: './chess-game.component.scss',
})
export class ChessGameComponent {}
