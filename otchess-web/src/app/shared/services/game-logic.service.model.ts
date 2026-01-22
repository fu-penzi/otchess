export const chessBoardDim = 8;

export type ChessBoard = ChessSquare[][];
export interface Game {
  squares: ChessBoard;
  player: PieceColorEnum;
  playerNowMoving: PieceColorEnum;
  moves: ChessMove[];
}
export interface ChessMove {
  from: ChessPosition;
  to: ChessPosition;
}
export interface ChessSquare {
  isDark: boolean;
  piece: ChessPiece | null;
  pos: ChessPosition;
}
export interface ChessPiece {
  type: PieceTypeEnum;
  color: PieceColorEnum;
}

export const rowLetters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
export interface ChessPosition {
  id: string;
  row: number;
  col: number;
}
export function newPosition(row: number, col: number): ChessPosition {
  return { id: getPositionId(row, col), row, col };
}
export function getPositionId(row: number, col: number): string {
  return `${rowLetters[row]}${col}`;
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
