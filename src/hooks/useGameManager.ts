import { useEffect, useCallback, useReducer } from 'react';
import { ActionTypes } from '../state/action-types';
import { gameReducer } from '../state/reducers';
import { GameState, Turn } from '../types/game';
import { waitUntil } from '../utils/waitUntil';
import useSpeechRecognition from './useSpeechRecognition';
import useSpeechSynthesis from './useSpeechSynthesis';

const initialState = {
  gameState: GameState.NotStarted,
  turn: null,
  wordHistory: [],
  winner: null,
};

interface GamemanagerOptions {
  words: string[];
  language: 'tr-TR' | 'en-US';
}

export const useGameManager = ({ words, language }: GamemanagerOptions) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const { gameState, turn, wordHistory, winner } = state;

  function getStartCharacter() {
    const word = wordHistory[wordHistory.length - 1];
    if (!word) return null;
    return word[word.length - 1];
  }

  const speechRecognition = useSpeechRecognition({
    onResult: (transcript: string) => {
      speechRecognition.stopListening();
      dispatch({ type: ActionTypes.AddWord, payload: { word: transcript.toLocaleLowerCase() } });
      dispatch({
        type: ActionTypes.SetTurn,
        payload: { turn: turn === Turn.Player ? Turn.Computer : Turn.Player },
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const speechSynthesis = useSpeechSynthesis({ language });

  const userPlay = useCallback(() => {
    speechRecognition.listen({ lang: language });
    return () => speechRecognition.stopListening();
  }, [language, speechRecognition.listen]);

  const computerPlay = useCallback(async () => {
    const startCharacter = getStartCharacter();
    await waitUntil(3000);
    if (!startCharacter) return;

    const filteredWords = words.filter((word: string) => word[0] === startCharacter);
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    const randomName = filteredWords[randomIndex];

    speechSynthesis.speak(randomName);
    dispatch({ type: ActionTypes.AddWord, payload: { word: randomName } });
    dispatch({ type: ActionTypes.SetTurn, payload: { turn: Turn.Player } });
  }, [speechSynthesis, getStartCharacter]);

  useEffect(() => {
    if (gameState === GameState.Finished) return;

    if (turn === Turn.Player) {
      userPlay();
    } else {
      computerPlay();
    }
  }, [turn]);

  const startNewGame = useCallback(() => {
    dispatch({ type: ActionTypes.StartNewGame });
  }, []);

  return {
    startNewGame,
    gameState,
    turn,
    wordHistory,
    winner,
  };
};

export default useGameManager;
