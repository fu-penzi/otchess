import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  Board,
  chessBoardDim,
  GameLogicService,
  Piece,
  PieceColorEnum,
  Square,
} from '@src/shared/services/game-logic.service';

import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { ChessPieceComponent } from '@src/shared/components/chess-board/components/chess-piece/chess-piece.component';

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
  readonly _$possibleMoves = computed<Square[]>(() =>
    this._gameLogicService.getPossibleMoves(this.$draggedSquare()),
  );

  canMoveTo(square: Square): boolean {
    return this._$possibleMoves().includes(square);
  }

  ngOnInit(): void {
    this._gameLogicService.startGame();
  }

  pieceDraggable(piece: Piece): boolean {
    return piece.color === this._gameLogicService.$chessGame().player;
  }

  onPieceDrag(square: Square) {
    this.$draggedSquare.set(square);
  }

  onPieceDrop(e: CdkDragEnd, square: Square) {
    this.$draggedSquare.set(null);
    const { piece, pos }: Square = square;

    console.assert(!!piece);
    if (!piece) {
      return;
    }
    const elWidth: number = ((e.event.target as HTMLElement).parentElement as HTMLElement)
      .offsetWidth;
    const offsetX = Math.round(e.distance.x / elWidth);
    const offsetY = (this._$boardReversed() ? 1 : -1) * Math.round(e.distance.y / elWidth);

    this._gameLogicService.movePiece(square, { col: pos.col + offsetX, row: pos.row + offsetY });
    this.$dragPositions()[pos.row * chessBoardDim + pos.col] = { x: 0, y: 0 };
  }

  protected readonly rowLetters = rowLetters;
  protected readonly chessBoardDim = chessBoardDim;
}
