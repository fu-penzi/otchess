import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';

import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import {
  ChessBoard,
  chessBoardDim,
  newPosition,
  ChessPiece,
  PieceColorEnum,
  rowLetters,
  ChessSquare,
} from '@shared/services/game-logic.service.model';
import { GameLogicService } from '@shared/services/game-logic.service';
import { ChessPieceComponent } from '@app/views/game/chess-piece/chess-piece.component';

interface DragPosition {
  x: number;
  y: number;
}
@Component({
  selector: 'app-chess-board',
  imports: [NgClass, CdkDrag, ChessPieceComponent, ChessPieceComponent],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.scss',
})
export class ChessBoardComponent implements OnInit {
  readonly $draggedSquare = signal<ChessSquare | null>(null);
  readonly $dragPositions = signal<DragPosition[]>([...Array(64).fill({ x: 0, y: 0 })]);
  readonly $chessBoard = computed<ChessBoard>(() => {
    const { squares } = this._gameLogicService.$chessGame();
    return this._$boardReversed() ? squares : [...squares].reverse();
  });

  private readonly _gameLogicService = inject(GameLogicService);

  private readonly _$boardReversed = computed<boolean>(
    () => this._gameLogicService.$chessGame().player === PieceColorEnum.Black,
  );
  private readonly _$possibleMoves = computed<ChessSquare[]>(() =>
    this._gameLogicService.getPossibleMoves(this.$draggedSquare()),
  );

  ngOnInit(): void {
    this._gameLogicService.startGame();
  }

  canMoveTo(square: ChessSquare): boolean {
    return this._$possibleMoves().includes(square);
  }

  pieceDraggable(piece: ChessPiece): boolean {
    return piece.color === this._gameLogicService.$chessGame().playerNowMoving;
  }

  onPieceDrag(square: ChessSquare): void {
    this.$draggedSquare.set(square);
  }

  onPieceDrop(cdkDragEnd: CdkDragEnd, square: ChessSquare): void {
    this.$draggedSquare.set(null);
    const { piece, pos }: ChessSquare = square;

    console.assert(!!piece);
    if (!piece) {
      return;
    }
    const elWidth: number = ((cdkDragEnd.event.target as HTMLElement).parentElement as HTMLElement)
      .offsetWidth;
    const offsetX = Math.round(cdkDragEnd.distance.x / elWidth);
    const offsetY = (this._$boardReversed() ? 1 : -1) * Math.round(cdkDragEnd.distance.y / elWidth);

    this.$dragPositions()[pos.row * chessBoardDim + pos.col] = { x: 0, y: 0 };

    this._gameLogicService.movePiece(square, newPosition(pos.row + offsetY, pos.col + offsetX));
  }

  protected readonly rowLetters = rowLetters;
  protected readonly chessBoardDim = chessBoardDim;
}
