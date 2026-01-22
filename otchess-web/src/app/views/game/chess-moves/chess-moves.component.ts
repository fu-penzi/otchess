import { Component, computed, inject } from '@angular/core';
import { CustomCardComponent } from '@shared/components/custom-card/custom-card.component';
import { ChessMove } from '@shared/services/game-logic.service.model';
import { GameLogicService } from '@shared/services/game-logic.service';

@Component({
  selector: 'app-chess-moves',
  imports: [CustomCardComponent],
  templateUrl: './chess-moves.component.html',
  styleUrl: './chess-moves.component.scss',
})
export class ChessMovesComponent {
  private readonly _gameLogicService = inject(GameLogicService);
  readonly $moves = computed<ChessMove[]>(() => this._gameLogicService.$chessGame().moves);
}
