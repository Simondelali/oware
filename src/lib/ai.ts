import { GameState, Player } from './types';
import { makeMove, getPlayerPits } from './gameLogic';

const MAX_DEPTH = 8;

interface MoveScore {
  pit: number;
  score: number;
}

export function getBestMove(state: GameState, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): number {
  const depth = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : MAX_DEPTH;
  const player: Player = 1; // AI is always Player 1 (North)

  const validPits = getPlayerPits(player).filter(pit => state.board[pit] > 0);
  if (validPits.length === 0) return -1;

  let bestMove: MoveScore = { pit: validPits[0], score: -Infinity };

  for (const pit of validPits) {
    const newState = makeMove(state, pit);
    const score = minimax(newState, depth - 1, -Infinity, Infinity, false, player);
    if (score > bestMove.score) {
      bestMove = { pit, score };
    }
  }

  return bestMove.pit;
}

function minimax(
  state: GameState,
  depth: number,
  alpha: number,
  beta: number,
  maximizingPlayer: boolean,
  aiPlayer: Player
): number {
  if (depth === 0 || state.isGameOver) {
    return evaluate(state, aiPlayer);
  }

  const currentPlayer = maximizingPlayer ? aiPlayer : ((aiPlayer + 1) % 2) as Player;
  const pits = getPlayerPits(currentPlayer).filter(p => state.board[p] > 0);

  if (pits.length === 0) {
    return evaluate(state, aiPlayer);
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (const pit of pits) {
      const newState = makeMove(state, pit);
      const evalScore = minimax(newState, depth - 1, alpha, beta, false, aiPlayer);
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const pit of pits) {
      const newState = makeMove(state, pit);
      const evalScore = minimax(newState, depth - 1, alpha, beta, true, aiPlayer);
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

function evaluate(state: GameState, aiPlayer: Player): number {
  if (state.winner !== null) {
    return state.winner === aiPlayer ? 1000 : -1000;
  }
  const aiScore = state.stores[aiPlayer];
  const oppScore = state.stores[(aiPlayer + 1) % 2];
  return aiScore - oppScore;
}