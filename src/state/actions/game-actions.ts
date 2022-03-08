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

type GameActions = AddWordAction | SetTurnAction | StartNewGameAction | SetWinnerAction;

export default GameActions;
