import { Turn } from '../../types/game';
import ActionTypes from '../action-types';

interface AddWordAction {
  type: ActionTypes.AddWord;
  payload: {
    word: string;
  };
}

interface SetTurnAction {
  type: ActionTypes.SetTurn;
  payload: {
    turn: Turn;
  };
}

interface StartNewGameAction {
  type: ActionTypes.StartNewGame;
  payload?: {
    startingPlayer?: Turn;
  };
}

interface SetWinnerAction {
  type: ActionTypes.SetWinner;
  payload: {
    turn: Turn;
  };
}

interface SetStartingPlayerAction {
  type: ActionTypes.SetStartingPlayer;
  payload: {
    turn: Turn | null;
  };
}

type GameActions =
  | AddWordAction
  | SetTurnAction
  | StartNewGameAction
  | SetWinnerAction
  | SetStartingPlayerAction;

export default GameActions;
