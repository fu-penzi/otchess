import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  Board,
  chessBoardDim,
  Game,
  GameLogicService,
  Piece,
  PieceColorEnum,
  PieceTypeEnum,
  Square,
} from '@src/shared/services/game-logic.service';
import {
  blackBishopSvg,
  blackKingSvg,
  blackKnightSvg,
  blackPawnSvg,
  blackQueenSvg,
  blackRookSvg,
  whiteBishopSvg,
  whiteKingSvg,
  whiteKnightSvg,
  whitePawnSvg,
  whiteQueenSvg,
  whiteRookSvg,
} from '@src/shared/assets';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';

export const rowLetters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

@Component({
  selector: 'app-chess-board',
  imports: [NgClass, CdkDrag],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.scss',
})
export class ChessBoardComponent implements OnInit {
  readonly draggedSquare$: WritableSignal<Square | null> = signal(null);
  readonly dragPositions: { x: number; y: number }[] = [...Array(64).fill({ x: 0, y: 0 })];
  readonly $chessBoard: Signal<Board> = computed(() => {
    const { squares } = this._gameLogicService.$chessGame();
    return this._$boardReversed() ? squares : [...squares].reverse();
  });

  private readonly _gameLogicService: GameLogicService = inject(GameLogicService);

  private readonly _$chessGame: Signal<Game> = this._gameLogicService.$chessGame;
  private readonly _$boardReversed: Signal<boolean> = computed(
    () => this._gameLogicService.$chessGame().player === PieceColorEnum.Black,
  );
  readonly _$possibleMoves: Signal<Square[]> = computed(() =>
    this._gameLogicService.getPossibleMoves(this.draggedSquare$()),
  );

  canMoveTo(square: Square): boolean {
    return this._$possibleMoves().includes(square);
  }

  getPieceImage({ type, color }: Piece): string {
    const isWhite = color === PieceColorEnum.White;
    switch (type) {
      case PieceTypeEnum.Pawn: {
        return isWhite ? whitePawnSvg : blackPawnSvg;
      }
      case PieceTypeEnum.Rook: {
        return isWhite ? whiteRookSvg : blackRookSvg;
      }
      case PieceTypeEnum.Knight: {
        return isWhite ? whiteKnightSvg : blackKnightSvg;
      }
      case PieceTypeEnum.Bishop: {
        return isWhite ? whiteBishopSvg : blackBishopSvg;
      }
      case PieceTypeEnum.Queen: {
        return isWhite ? whiteQueenSvg : blackQueenSvg;
      }
      case PieceTypeEnum.King: {
        return isWhite ? whiteKingSvg : blackKingSvg;
      }
      default: {
        console.assert(false, `Invalid piece data: type: ${type} color:${color}`);
        return '';
      }
    }
  }

  ngOnInit(): void {
    this._gameLogicService.startGame();
  }

  pieceDraggable(piece: Piece): boolean {
    return piece.color === this._$chessGame().player;
  }

  onPieceDrag(square: Square) {
    this.draggedSquare$.set(square);
  }

  onPieceDrop(e: CdkDragEnd, square: Square) {
    this.draggedSquare$.set(null);
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
    this.dragPositions[pos.row * chessBoardDim + pos.col] = { x: 0, y: 0 };
  }

  protected readonly rowLetters = rowLetters;
  protected readonly chessBoardDim = chessBoardDim;
}
