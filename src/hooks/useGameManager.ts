import { useContext } from 'react';
import { GameManagerContext, GameManagerContextState } from '../context/GameManagerContext';

const useGameManager = (): GameManagerContextState => {
  return useContext(GameManagerContext);
};

export default useGameManager;
