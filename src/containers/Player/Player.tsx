import React, { FunctionComponent } from 'react';
import useGameManager from '../../hooks/useGameManager';

import SpeechBubble from '../../components/SpeechBubble';
import capitalize from '../../utils/capitalize';

import { GameState, Turn } from '../../types/game';

import './style.css';

interface PlayerProps {
  name: string;
  imageSrc: string;
  position: 'left' | 'right';
  turn: Turn;
}

const Player: FunctionComponent<PlayerProps> = ({ name, imageSrc, position, turn }) => {
  const { turn: currentTurn, gameState, winner, lastWord } = useGameManager();

  const hasCurrentTurn = currentTurn === turn;
  const hasGameEnded = gameState === GameState.Finished;
  const isWinner = winner === turn;

  const hasAnswered = !hasCurrentTurn && lastWord;
  const isThinking = hasCurrentTurn && !hasGameEnded;
  const wonLastWord = isWinner && hasGameEnded && lastWord;

  return (
    <section className="section">
      <div className="player">
        {(hasAnswered || isThinking || wonLastWord) && (
          <SpeechBubble position={position}>
            <div className="speech-content">
              {isThinking && <img src="./thinking.svg" alt="" />}
              {hasAnswered && (
                <h1 className="is-size-3-widescreen is-size-4-desktop is-size-4-tablet is-size-5-mobile">
                  {capitalize(lastWord)}
                </h1>
              )}
            </div>
          </SpeechBubble>
        )}
        <img className="player-image" src={imageSrc} alt="" />
      </div>
      <h2 className="subtitle has-text-centered">{name}</h2>
    </section>
  );
};

export default Player;
