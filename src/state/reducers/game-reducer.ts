import ActionTypes from '../action-types';
import Action from '../actions';

import { GameState, Turn } from '../../types/game';

export interface GameReducerState {
  startingPlayer: Turn | null;
  gameState: GameState;
  lastWord: string | null;
  wordHistory: string[];
  turn: Turn | null;
  winner: Turn | null;
}

const initialState = {
  startingPlayer: null,
  gameState: GameState.NotStarted,
  lastWord: null,
  wordHistory: [],
  turn: null,
  winner: null,
};

const getRandomPlayer = (): Turn => {
  return Math.random() < 0.5 ? Turn.Player : Turn.Computer;
};

const gameReducer = (state: GameReducerState = initialState, action: Action): GameReducerState => {
  switch (action.type) {
    case ActionTypes.StartNewGame:
      const startingPlayer = state.startingPlayer ?? getRandomPlayer();
      return {
        ...initialState,
        startingPlayer: state.startingPlayer,
        gameState: GameState.Started,
        turn: startingPlayer,
      };
    case ActionTypes.SetTurn:
      return { ...state, turn: action.payload.turn };
    case ActionTypes.AddWord:
      return {
        ...state,
        lastWord: action.payload.word,
        wordHistory: [...state.wordHistory, action.payload.word],
        turn: state.turn === Turn.Player ? Turn.Computer : Turn.Player,
      };
    case ActionTypes.SetWinner:
      return {
        ...state,
        gameState: GameState.Finished,
        winner: action.payload.turn,
      };
    case ActionTypes.SetStartingPlayer:
      return { ...state, startingPlayer: action.payload.turn };
    default:
      return state;
  }
};

export default gameReducer;
