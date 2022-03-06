import { ActionTypes } from '../action-types';
import { Action } from '../actions';

import names from '../../names.json';
import { GameState, Turn } from '../../types/game';

interface GameReducerState {
  gameState: GameState;
  wordHistory: string[];
  turn: Turn | null;
  winner: Turn | null;
}

const initialState = {
  gameState: GameState.NotStarted,
  turn: null,
  wordHistory: [],
  winner: null,
};

function isValidWord(wordHistory: string[], word: string) {
  if (wordHistory.includes(word)) return false;
  if (!names.includes(word)) return false;

  const lastWord = wordHistory[wordHistory.length - 1];
  if (!lastWord) return true;

  return lastWord[lastWord.length - 1] === word[0];
}

export const gameReducer = (state: GameReducerState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.StartNewGame:
      return { ...initialState, gameState: GameState.Started, turn: Turn.Player };
    case ActionTypes.SetTurn:
      return { ...state, turn: action.payload.turn };
    case ActionTypes.AddWord:
      if (!isValidWord(state.wordHistory, action.payload.word)) {
        return {
          ...state,
          gameState: GameState.Finished,
          winner: state.turn === Turn.Player ? Turn.Computer : Turn.Player,
        };
      }

      return {
        ...state,
        wordHistory: [...state.wordHistory, action.payload.word],
      };
    case ActionTypes.SetWinner:
      return {
        ...state,
        gameState: GameState.Finished,
        winner: action.payload.turn,
      };
    default:
      return state;
  }
};
