import { Dispatch } from 'react';
import { Turn } from '../../types/game';
import ActionTypes from '../action-types';
import Action from '../actions';

const addWord = (dispatch: Dispatch<Action>) => (word: string) => {
  dispatch({ type: ActionTypes.AddWord, payload: { word } });
};

const setTurn = (dispatch: Dispatch<Action>) => (turn: Turn) => {
  dispatch({ type: ActionTypes.SetTurn, payload: { turn } });
};

const startNewGame = (dispatch: Dispatch<Action>) => () => {
  dispatch({ type: ActionTypes.StartNewGame });
};

const setWinner = (dispatch: Dispatch<Action>) => (turn: Turn) => {
  dispatch({ type: ActionTypes.SetWinner, payload: { turn } });
};

const setStartingPlayer = (dispatch: Dispatch<Action>) => (turn: Turn | null) => {
  dispatch({ type: ActionTypes.SetStartingPlayer, payload: { turn } });
};

export interface BoundActionCreators {
  addWord: ReturnType<typeof addWord>;
  setTurn: ReturnType<typeof setTurn>;
  startNewGame: ReturnType<typeof startNewGame>;
  setWinner: ReturnType<typeof setWinner>;
  setStartingPlayer: ReturnType<typeof setStartingPlayer>;
}

const bindActionCreators = (dispatch: Dispatch<Action>): BoundActionCreators => ({
  addWord: addWord(dispatch),
  setTurn: setTurn(dispatch),
  startNewGame: startNewGame(dispatch),
  setWinner: setWinner(dispatch),
  setStartingPlayer: setStartingPlayer(dispatch),
});

export default bindActionCreators;
