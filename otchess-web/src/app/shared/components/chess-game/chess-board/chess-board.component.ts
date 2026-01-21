import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';

import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import {
  Board,
  chessBoardDim,
  Piece,
  PieceColorEnum,
  Square,
} from '@shared/services/game-logic.service.model';
import { GameLogicService } from '@shared/services/game-logic.service';
import { ChessPieceComponent } from '@shared/components/chess-game/chess-piece/chess-piece.component';

export const rowLetters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

interface DragPosition {
  x: number;
  y: number;
}
@Component({
  selector: 'app-chess-board',
  imports: [NgClass, CdkDrag, ChessPieceComponent],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.scss',
})
export class ChessBoardComponent implements OnInit {
  readonly $draggedSquare = signal<Square | null>(null);
  readonly $dragPositions = signal<DragPosition[]>([...Array(64).fill({ x: 0, y: 0 })]);
  readonly $chessBoard = computed<Board>(() => {
    const { squares } = this._gameLogicService.$chessGame();
    return this._$boardReversed() ? squares : [...squares].reverse();
  });

  private readonly _gameLogicService = inject(GameLogicService);

  private readonly _$boardReversed = computed<boolean>(
    () => this._gameLogicService.$chessGame().player === PieceColorEnum.Black,
  );
  private readonly _$possibleMoves = computed<Square[]>(() =>
    this._gameLogicService.getPossibleMoves(this.$draggedSquare()),
  );

  ngOnInit(): void {
    this._gameLogicService.startGame();
  }

  canMoveTo(square: Square): boolean {
    return this._$possibleMoves().includes(square);
  }

  pieceDraggable(piece: Piece): boolean {
    return piece.color === this._gameLogicService.$chessGame().playerNowMoving;
  }

  onPieceDrag(square: Square): void {
    this.$draggedSquare.set(square);
  }

  onPieceDrop(cdkDragEnd: CdkDragEnd, square: Square): void {
    this.$draggedSquare.set(null);
    const { piece, pos }: Square = square;

    console.assert(!!piece);
    if (!piece) {
      return;
    }
    const elWidth: number = ((cdkDragEnd.event.target as HTMLElement).parentElement as HTMLElement)
      .offsetWidth;
    const offsetX = Math.round(cdkDragEnd.distance.x / elWidth);
    const offsetY = (this._$boardReversed() ? 1 : -1) * Math.round(cdkDragEnd.distance.y / elWidth);

    this.$dragPositions()[pos.row * chessBoardDim + pos.col] = { x: 0, y: 0 };
    this._gameLogicService.movePiece(square, { col: pos.col + offsetX, row: pos.row + offsetY });
  }

  protected readonly rowLetters = rowLetters;
  protected readonly chessBoardDim = chessBoardDim;
}
