import React, { FunctionComponent, useEffect, useMemo, useReducer } from 'react';

import { GameManagerContext } from './GameManagerContext';
import gameReducer from '../state/reducers';
import { Turn, GameState } from '../types/game';

import bindActionCreators from '../state/action-creators';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import useSpeechSynthesis from '../hooks/useSpeechSynthesis';
import useCoundownTimer from '../hooks/useCoundownTimer';

import isValidWord from '../utils/isValidWord';
import getRandomWord from '../utils/getRandomWord';

interface GameManagerProviderProps {
  timer: number;
  words: string[];
  language: string;
  aiOptions: {
    lossPercentage: number;
    timeToAnswer: number;
  };
}

const initialState = {
  startingPlayer: null,
  gameState: GameState.NotStarted,
  lastWord: null,
  wordHistory: [],
  turn: null,
  winner: null,
};

const GameManagerProvider: FunctionComponent<GameManagerProviderProps> = ({
  timer,
  words,
  language,
  aiOptions,
  children,
}) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { startingPlayer, gameState, lastWord, turn, wordHistory, winner } = state;

  const { timeLeft, resetTimer, restartTimer } = useCoundownTimer(timer);

  useEffect(() => {
    if (gameState === GameState.Started) {
      restartTimer();
    }
  }, [gameState]);

  const { addWord, setWinner, startNewGame, setStartingPlayer } = useMemo(
    () => bindActionCreators(dispatch),
    [dispatch],
  );

  const speechRecognition = useSpeechRecognition({
    onResult: (transcript: string) => {
      speechRecognition.stopListening();

      const word = transcript.toLocaleLowerCase();
      if (!isValidWord({ words, wordHistory, word })) {
        setWinner(Turn.Computer);
      } else {
        addWord(word);
      }
    },
  });

  const speechSynthesis = useSpeechSynthesis({ language });

  useEffect(() => {
    if (gameState !== GameState.Started) return undefined;

    restartTimer();
    if (turn === Turn.Player) {
      speechRecognition.listen({ lang: language });
      return () => speechRecognition.stopListening();
    }

    const thinkingTime = (Math.floor(Math.random() * aiOptions.timeToAnswer) + 1) * 1000;
    const shouldLose = Math.random() <= aiOptions.lossPercentage / 100;
    if (shouldLose) return undefined;

    const thinkTimer = setTimeout(() => {
      if (gameState === GameState.Started) {
        const randomWord = getRandomWord({ words, lastWord });
        speechSynthesis.speak(randomWord);
        addWord(randomWord);
      }
    }, thinkingTime);

    return () => clearTimeout(thinkTimer);
  }, [gameState, turn]);

  useEffect(() => {
    if (winner) {
      speechRecognition.stopListening();
      speechSynthesis.cancel();
      resetTimer();
    }
  }, [winner]);

  useEffect(() => {
    if (timeLeft === 0 && turn) {
      setWinner(turn === Turn.Player ? Turn.Computer : Turn.Player);
    }
  }, [timeLeft]);

  return (
    <GameManagerContext.Provider
      value={{
        startingPlayer,
        gameState,
        lastWord,
        timeLeft,
        wordHistory,
        turn,
        winner,
        setWinner,
        startNewGame,
        setStartingPlayer,
      }}
    >
      {children}
    </GameManagerContext.Provider>
  );
};

export default GameManagerProvider;
