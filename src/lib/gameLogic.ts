// src/lib/gameLogic.ts
import { Board, Stores, Player, PitIndex, GameState } from './types';

export type { GameState };

const INITIAL_SEEDS = 4;
const TOTAL_PITS = 12;

export function createInitialState(): GameState {
  const board = Array(TOTAL_PITS).fill(INITIAL_SEEDS) as Board;
  console.log('Initial board:', board);
  return {
    board,
    stores: [0, 0],
    currentPlayer: 0,
    winner: null,
    isGameOver: false,
  };
}

export function getPlayerPits(player: Player): PitIndex[] {
  return player === 0 ? [0, 1, 2, 3, 4, 5] : [6, 7, 8, 9, 10, 11];
}

export function isValidMove(state: GameState, pit: PitIndex): boolean {
  const valid = (
    getPlayerPits(state.currentPlayer).includes(pit) &&
    state.board[pit] > 0 &&
    !state.isGameOver
  );
  return valid;
}

export function makeMove(state: GameState, startPit: PitIndex): GameState {
  if (!isValidMove(state, startPit)) {
    return state;
  }

  console.log(`\nMOVE FROM PIT ${startPit}`);
  console.log(`Player ${state.currentPlayer}`);
  console.log(`Starting board:`, state.board);

  const board = [...state.board] as Board;
  const stores = [...state.stores] as Stores;
  let seeds = board[startPit];
  board[startPit] = 0;
  
  console.log(`Picked up ${seeds} seeds`);

  let pos = startPit;
  const path: PitIndex[] = [];
  let totalCaptured = 0;

  while (seeds > 0) {
    pos = (pos + 1) % TOTAL_PITS;
    board[pos]++;
    path.push(pos as PitIndex);
    seeds--;
    
    console.log(`  Dropped seed in pit ${pos}, now has ${board[pos]} seeds`);

    if (seeds > 0 && board[pos] === 4) {
      const pitOwner = pos < 6 ? 0 : 1;
      const currentSide = state.currentPlayer;
      
      if (pitOwner === currentSide) {
        console.log(`  MID-CAPTURE: Captured 4 from pit ${pos}`);
        stores[currentSide] += 4;
        board[pos] = 0;
        totalCaptured += 4;
      }
    }

    if (seeds === 0) {
      console.log(`  LAST SEED in pit ${pos} (${board[pos]} seeds)`);
      
      if (board[pos] === 4) {
        console.log(`  LAST SEED CAPTURE: Captured 4 from pit ${pos}`);
        stores[state.currentPlayer] += 4;
        board[pos] = 0;
        totalCaptured += 4;
      }
      else if (board[pos] > 1) {
        console.log(`  RELAY: Picking up ${board[pos]} seeds`);
        seeds = board[pos];
        board[pos] = 0;
      }
    }
  }

  console.log(`Total captured: ${totalCaptured}`);
  console.log(`Final board:`, board);

  const totalSeedsOnBoard = board.reduce((a, b) => a + b, 0);
  console.log(`Seeds left on board: ${totalSeedsOnBoard}`);

  const newState: GameState = {
    ...state,
    board,
    stores,
    currentPlayer: ((state.currentPlayer + 1) % 2) as Player,
    lastMove: { from: startPit, path, captured: totalCaptured },
  };

  if (totalSeedsOnBoard === 8 && totalCaptured > 0) {
    console.log('ENDGAME: 8 seeds left');
    stores[state.currentPlayer] += totalSeedsOnBoard;
    for (let i = 0; i < TOTAL_PITS; i++) board[i] = 0;
    return finishGame({ ...newState, board, stores, isGameOver: true });
  }

  return checkStarvation({ ...newState, board, stores });
}

function checkStarvation(state: GameState): GameState {
  const southEmpty = state.board.slice(0, 6).every(v => v === 0);
  const northEmpty = state.board.slice(6, 12).every(v => v === 0);

  if (southEmpty || northEmpty) {
    console.log('STARVATION');
    const board = [...state.board] as Board;
    const stores = [...state.stores] as Stores;
    
    for (let i = 0; i < TOTAL_PITS; i++) {
      if (board[i] > 0) {
        const owner = i < 6 ? 0 : 1;
        stores[owner] += board[i];
        board[i] = 0;
      }
    }
    return finishGame({ ...state, board, stores, isGameOver: true });
  }
  return state;
}

function finishGame(state: GameState): GameState {
  const s1 = state.stores[0];
  const s2 = state.stores[1];
  const winner = s1 > s2 ? 0 : s2 > s1 ? 1 : null;
  console.log(`\nGAME OVER! South: ${s1}, North: ${s2}, Winner: ${winner === 0 ? 'You' : winner === 1 ? 'AI' : 'Draw'}`);
  return { ...state, winner, isGameOver: true };
}