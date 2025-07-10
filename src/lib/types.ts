// src/lib/types.ts
export type Player = 0 | 1;
export type PitIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type Board = [
  number, number, number, number, number, number,
  number, number, number, number, number, number
];

export type Stores = [number, number];

export interface GameState {
  board: Board;
  stores: Stores;
  currentPlayer: Player;
  winner: Player | null;
  isGameOver: boolean;
  lastMove?: { from: PitIndex; path: PitIndex[]; captured: number };
}