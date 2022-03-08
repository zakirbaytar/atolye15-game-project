import { createContext } from 'react';
import { GameReducerState } from '../state/reducers/game-reducer';
import { GameState, Turn } from '../types/game';

export type GameManagerContextState = GameReducerState & {
  timeLeft: number;
  setWinner: (turn: Turn) => void;
  startNewGame: (turn?: Turn) => void;
  setStartingPlayer: (turn: Turn | null) => void;
};

export const GameManagerContext = createContext<GameManagerContextState>({
  startingPlayer: null,
  gameState: GameState.NotStarted,
  lastWord: null,
  wordHistory: [],
  turn: null,
  winner: null,
  timeLeft: 8,
  setWinner: () => {},
  startNewGame: () => {},
  setStartingPlayer: () => {},
});
