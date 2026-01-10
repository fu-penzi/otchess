import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

export interface Board {
  squares: Square[][];
}

export interface Square {
  isDark: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GameLogicService {
  private _chessGame$: WritableSignal<Board> = signal({ squares: [] });

  readonly chessGame$: Signal<Board> = this._chessGame$.asReadonly();

  startGame() {
    const squares: Square[][] = [];

    for (let row = 0; row < 8; row++) {
      const rowArr: Square[] = [];

      for (let col = 0; col < 8; col++) {
        rowArr.push({
          isDark: (row + col) % 2 == 0,
        });
      }

      squares.push(rowArr);
    }

    this._chessGame$.set({ squares });
  }
}
