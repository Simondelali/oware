// src/store/gameStore.ts
import { create } from 'zustand';
import { GameState, createInitialState, makeMove as gameMakeMove, isValidMove } from '@/lib/gameLogic';

interface GameStore extends GameState {
  makeMove: (pit: number) => void;
  reset: () => void;
  setAIMove: () => void;
  difficulty: 'easy' | 'medium' | 'hard';
  setDifficulty: (d: 'easy' | 'medium' | 'hard') => void;
  isAIThinking: boolean;
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...createInitialState(),
  difficulty: 'medium',
  isAIThinking: false,

  makeMove: (pit: number) => {
    const state = get();
    
    if (state.currentPlayer !== 0 || state.isGameOver || state.isAIThinking) return;
    if (!isValidMove(state, pit as any)) return;

    const newState = gameMakeMove(state, pit as any);
    set(newState);

    if (!newState.isGameOver && newState.currentPlayer === 1) {
      setTimeout(() => get().setAIMove(), 1000);
    }
  },

  setAIMove: () => {
    const state = get();
    if (state.isGameOver || state.currentPlayer === 0 || state.isAIThinking) return;

    set({ isAIThinking: true });
    
    setTimeout(() => {
      const validMoves = [];
      for (let i = 6; i < 12; i++) {
        if (state.board[i] > 0) validMoves.push(i);
      }

      if (validMoves.length > 0) {
        const chosenPit = validMoves[Math.floor(Math.random() * validMoves.length)];
        const newState = gameMakeMove(state, chosenPit as any);
        set({ ...newState, isAIThinking: false });
      } else {
        set({ isAIThinking: false });
      }
    }, 800);
  },

  reset: () => {
    set({
      ...createInitialState(),
      difficulty: get().difficulty,
      isAIThinking: false,
    });
  },

  setDifficulty: (difficulty) => set({ difficulty }),
}));