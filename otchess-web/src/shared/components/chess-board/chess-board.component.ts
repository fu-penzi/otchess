import { Component, inject, OnInit, Signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Board, GameLogicService } from '@src/shared/services/game-logic.service';

@Component({
  selector: 'app-chess-board',
  imports: [NgClass],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.scss',
})
export class ChessBoardComponent implements OnInit {
  private _gameLogicService: GameLogicService = inject(GameLogicService);

  readonly chessGame$: Signal<Board> = this._gameLogicService.chessGame$;

  ngOnInit(): void {
    this._gameLogicService.startGame();
  }
}
