import { Component, input } from '@angular/core';
import { Piece, PieceColorEnum, PieceTypeEnum } from '@src/shared/services/game-logic.service';
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

@Component({
  selector: 'app-chess-piece',
  imports: [],
  templateUrl: './chess-piece.component.html',
  styleUrl: './chess-piece.component.css',
})
export class ChessPieceComponent {
  readonly piece = input<Piece>();

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
}
