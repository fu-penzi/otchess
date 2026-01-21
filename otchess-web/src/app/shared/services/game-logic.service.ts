import { Injectable, Signal, signal } from '@angular/core';
import {
  chessBoardDim,
  Game,
  PieceColorEnum,
  PieceTypeEnum,
  Position,
  Square,
} from '@app/shared/services/game-logic.service.model';

@Injectable({
  providedIn: 'root',
})
export class GameLogicService {
  private readonly _$chessGame = signal<Game>({
    squares: [],
    player: PieceColorEnum.White,
    playerNowMoving: PieceColorEnum.White,
  });
  readonly $chessGame: Signal<Game> = this._$chessGame.asReadonly();

  startGame(): void {
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

    this._$chessGame.update((game) => ({ ...game, squares }));
  }

  movePiece(square: Square, endPos: Position): void {
    if (
      (endPos.row === square.pos.row && endPos.col === square.pos.col) ||
      !this._isValidDim(endPos.row) ||
      !this._isValidDim(endPos.col) ||
      !this._canMove(square, endPos)
    ) {
      return;
    }
    this._$chessGame.update((game: Game) => {
      game.squares[endPos.row][endPos.col].piece = square.piece;
      game.squares[square.pos.row][square.pos.col].piece = null;
      game.playerNowMoving =
        game.playerNowMoving === PieceColorEnum.White ? PieceColorEnum.Black : PieceColorEnum.White;

      return game;
    });
  }

  getPossibleMoves(square: Square | null): Square[] {
    if (!square || !square.piece) {
      return [];
    }
    const { pos } = square;
    const game: Game = this.$chessGame();
    const squares: Square[] = [];

    switch (square.piece.type) {
      case PieceTypeEnum.Pawn: {
        const direction: number = game.playerNowMoving === PieceColorEnum.Black ? -1 : 1;
        const startingRow: number = game.playerNowMoving === PieceColorEnum.Black ? 6 : 1;

        // Forward move
        const forwardPos = pos.row + direction;
        if (this._isValidMove(forwardPos, pos.col) && !this._hasEnemyPiece(forwardPos, pos.col)) {
          squares.push(game.squares[forwardPos][pos.col]);
        }

        // Diagonal captures
        [pos.col + 1, pos.col - 1].forEach((col) => {
          if (this._isValidMove(forwardPos, col) && this._hasEnemyPiece(forwardPos, col)) {
            squares.push(game.squares[forwardPos][col]);
          }
        });

        // Double forward move from starting position
        if (square.pos.row === startingRow) {
          const doubleForwardPos = pos.row + direction * 2;
          if (
            this._isValidMove(doubleForwardPos, pos.col) &&
            !this._hasEnemyPiece(doubleForwardPos, pos.col)
          ) {
            squares.push(game.squares[doubleForwardPos][pos.col]);
          }
        }

        break;
      }
      case PieceTypeEnum.King: {
        for (const i of [-1, 0, 1]) {
          const row = pos.row + i;
          if (!this._isValidDim(row)) {
            continue;
          }
          if (this._isValidMove(row, pos.col)) {
            squares.push(game.squares[row][pos.col]);
          }
          if (this._isValidMove(row, pos.col - 1)) {
            squares.push(game.squares[row][pos.col - 1]);
          }
          if (this._isValidMove(row, pos.col + 1)) {
            squares.push(game.squares[row][pos.col + 1]);
          }
        }
        break;
      }
      case PieceTypeEnum.Knight: {
        const moveSet: number[][] = [
          [2, -1],
          [2, 1],
          [-2, -1],
          [-2, 1],
          [1, -2],
          [1, 2],
          [-1, -2],
          [-1, 2],
        ];
        for (const offset of moveSet) {
          if (this._isValidMove(pos.row + offset[0], pos.col + offset[1])) {
            squares.push(game.squares[pos.row + offset[0]][pos.col + offset[1]]);
          }
        }
        break;
      }
      case PieceTypeEnum.Rook: {
        squares.push(...this._getRookMoveset(square));
        break;
      }
      case PieceTypeEnum.Bishop: {
        squares.push(...this._getBishopMoveset(square));
        break;
      }
      case PieceTypeEnum.Queen: {
        squares.push(...this._getBishopMoveset(square), ...this._getRookMoveset(square));
        break;
      }
    }
    return squares;
  }
  private _getRookMoveset(square: Square): Square[] {
    const squares: Square[] = [];
    const game: Game = this.$chessGame();

    // Vertical movement
    [-1, 1].forEach((offset: number) => {
      for (let y = square.pos.row + offset; this._isValidDim(y); y += offset) {
        if (!this._isValidMove(y, square.pos.col)) {
          break;
        }
        squares.push(game.squares[y][square.pos.col]);
        if (this._hasEnemyPiece(y, square.pos.col)) {
          break;
        }
      }
    });
    // Horizontal movement
    [-1, 1].forEach((offset: number) => {
      for (let x = square.pos.col + offset; this._isValidDim(x); x += offset) {
        if (!this._isValidMove(square.pos.row, x)) {
          break;
        }
        squares.push(game.squares[square.pos.row][x]);
        if (this._hasEnemyPiece(square.pos.row, x)) {
          break;
        }
      }
    });
    return squares;
  }

  private _getBishopMoveset(square: Square): Square[] {
    const squares: Square[] = [];
    const game: Game = this.$chessGame();

    [-1, 1].forEach((offset: number) => {
      let x = square.pos.col + offset;
      for (
        let y = square.pos.row + offset;
        this._isValidDim(y) && this._isValidDim(x);
        y += offset
      ) {
        if (!this._isValidMove(y, x)) {
          break;
        }
        squares.push(game.squares[y][x]);
        if (this._hasEnemyPiece(y, x)) {
          break;
        }
        x += offset;
      }
    });
    [-1, 1].forEach((offset: number) => {
      let x = square.pos.col + -offset;
      for (
        let y = square.pos.row + offset;
        this._isValidDim(y) && this._isValidDim(x);
        y += offset
      ) {
        if (!this._isValidMove(y, x)) {
          break;
        }
        squares.push(game.squares[y][x]);
        if (this._hasEnemyPiece(y, x)) {
          break;
        }
        x -= offset;
      }
    });
    return squares;
  }

  private _hasEnemyPiece(row: number, col: number): boolean {
    const targetSquare: Square = this.$chessGame().squares[row][col];
    return !!targetSquare.piece && targetSquare.piece.color !== this.$chessGame().playerNowMoving;
  }

  private _isValidMove(row: number, col: number): boolean {
    if (!this._isValidDim(row) || !this._isValidDim(col)) {
      return false;
    }
    const targetSquare: Square = this.$chessGame().squares[row][col];
    return !targetSquare.piece || targetSquare.piece.color !== this.$chessGame().playerNowMoving;
  }
  private _isValidDim(idx: number): boolean {
    return idx < chessBoardDim && idx >= 0;
  }

  private _canMove(square: Square, endPos: Position): boolean {
    const possibleMoves: Square[] = this.getPossibleMoves(square);
    return !!possibleMoves.find(
      (targetSquare) => targetSquare.pos.col === endPos.col && targetSquare.pos.row === endPos.row,
    );
  }
}
