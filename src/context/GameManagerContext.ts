import { createContext } from 'react';

import { BoundActionCreators } from '../state/action-creators';
import { GameReducerState } from '../state/reducers/game-reducer';
import { GameState } from '../types/game';

import config from '../config';

export type GameManagerContextState = GameReducerState &
  Pick<BoundActionCreators, 'setWinner' | 'startNewGame' | 'setStartingPlayer'> & {
    turnTime: number;
    timeLeft: number;
  };

export const GameManagerContext = createContext<GameManagerContextState>({
  turnTime: config.turnTime,
  timeLeft: config.turnTime,
  startingPlayer: null,
  gameState: GameState.NotStarted,
  lastWord: null,
  wordHistory: [],
  turn: null,
  winner: null,
  setWinner: () => {},
  startNewGame: () => {},
  setStartingPlayer: () => {},
});
