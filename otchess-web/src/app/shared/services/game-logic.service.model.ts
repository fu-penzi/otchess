export const chessBoardDim = 8;

export type Board = Square[][];
export interface Game {
  squares: Board;
  player: PieceColorEnum;
  playerNowMoving: PieceColorEnum;
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
