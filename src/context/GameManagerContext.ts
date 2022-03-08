import { createContext } from 'react';
import { BoundActionCreators } from '../state/action-creators';
import { GameReducerState } from '../state/reducers/game-reducer';
import { GameState } from '../types/game';

export type GameManagerContextState = GameReducerState &
  Pick<BoundActionCreators, 'setWinner' | 'startNewGame' | 'setStartingPlayer'> & {
    timeLeft: number;
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
