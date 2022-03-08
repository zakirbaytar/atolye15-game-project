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

const startNewGame = (dispatch: Dispatch<Action>) => (turn?: Turn) => {
  dispatch({ type: ActionTypes.StartNewGame, payload: { startingPlayer: turn } });
};

const setWinner = (dispatch: Dispatch<Action>) => (turn: Turn) => {
  dispatch({ type: ActionTypes.SetWinner, payload: { turn } });
};

const setStartingPlayer = (dispatch: Dispatch<Action>) => (turn: Turn | null) => {
  dispatch({ type: ActionTypes.SetStartingPlayer, payload: { turn } });
};

interface BoundActionCreators {
  addWord: (word: string) => void;
  setTurn: (turn: Turn) => void;
  startNewGame: (turn?: Turn) => void;
  setWinner: (turn: Turn) => void;
  setStartingPlayer: (turn: Turn) => void;
}

const bindActionCreators = (dispatch: Dispatch<Action>): BoundActionCreators => ({
  addWord: addWord(dispatch),
  setTurn: setTurn(dispatch),
  startNewGame: startNewGame(dispatch),
  setWinner: setWinner(dispatch),
  setStartingPlayer: setStartingPlayer(dispatch),
});

export default bindActionCreators;
