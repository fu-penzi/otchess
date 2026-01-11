import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

export type Board = Square[][];

export interface Game {
  squares: Board;
  player: PieceColorEnum;
}

export interface Square {
  isDark: boolean;
  piece: Piece | null;
  pos: Position;
}

export interface Piece {
  type: PieceTypeEnum;
  color: PieceColorEnum;
}

export interface Position {
  row: number;
  col: number;
}

export enum PieceColorEnum {
  White = 'White',
  Black = 'Black',
}
export enum PieceTypeEnum {
  Pawn = 'Pawn',
  Rook = 'Rook',
  King = 'King',
  Queen = 'Queen',
  Bishop = 'Bishop',
  Knight = 'Knight',
}

export const chessBoardDim: number = 8;

@Injectable({
  providedIn: 'root',
})
export class GameLogicService {
  private _$chessGame: WritableSignal<Game> = signal({ squares: [], player: PieceColorEnum.White });

  readonly $chessGame: Signal<Game> = this._$chessGame.asReadonly();

  startGame() {
    const firstRowSeq: PieceTypeEnum[] = [
      PieceTypeEnum.Rook,
      PieceTypeEnum.Knight,
      PieceTypeEnum.Bishop,
      PieceTypeEnum.King,
      PieceTypeEnum.Queen,
      PieceTypeEnum.Bishop,
      PieceTypeEnum.Knight,
      PieceTypeEnum.Rook,
    ];

    const squares: Square[][] = [];
    for (let row = 0; row < chessBoardDim; row++) {
      const rowArr: Square[] = [];
      for (let col = 0; col < chessBoardDim; col++) {
        rowArr.push({ isDark: (row + col) % 2 == 0, piece: null, pos: { row, col } });
      }
      squares.push(rowArr);
    }

    for (let col = 0; col < chessBoardDim; col++) {
      squares[0][col].piece = {
        color: PieceColorEnum.White,
        type: firstRowSeq[col],
      };
    }
    for (let col = 0; col < chessBoardDim; col++) {
      squares[1][col].piece = { color: PieceColorEnum.White, type: PieceTypeEnum.Pawn };
    }

    for (let col = 0; col < chessBoardDim; col++) {
      squares[6][col].piece = { color: PieceColorEnum.Black, type: PieceTypeEnum.Pawn };
    }
    for (let col = 0; col < chessBoardDim; col++) {
      squares[7][col].piece = { color: PieceColorEnum.Black, type: firstRowSeq[col] };
    }

    this._$chessGame.set({ squares, player: this._$chessGame().player });
  }

  movePiece(square: Square, endPos: Position) {
    if (
      endPos.row > chessBoardDim ||
      endPos.row < 0 ||
      endPos.col > chessBoardDim ||
      endPos.col < 0
    ) {
      return;
    }
    if (!this._canMove(square, endPos)) {
      return;
    }
    this._$chessGame.update((game: Game) => {
      game.squares[endPos.row][endPos.col].piece = square.piece;
      game.squares[square.pos.row][square.pos.col].piece = null;
      return game;
    });
  }

  getPossibleMoves(square: Square | null): Square[] {
    if (!square) {
      return [];
    }
    const squares: Square[] = [];
    switch (square.piece?.type) {
      case PieceTypeEnum.Pawn:
        squares.push(this.$chessGame().squares[square.pos.row + 1][square.pos.col]);
    }
    return squares;
  }

  private _canMove(square: Square, endPos: Position): boolean {
    const possibleMoves: Square[] = this.getPossibleMoves(square);
    return !!possibleMoves.find(
      (targetSquare) => targetSquare.pos.col === endPos.col && targetSquare.pos.row === endPos.row,
    );
  }
}
