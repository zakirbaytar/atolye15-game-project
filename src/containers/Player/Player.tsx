import React, { FunctionComponent } from 'react';
import SpeechBubble from '../../components/SpeechBubble';
import useGameManager from '../../hooks/useGameManager';
import { GameState, Turn } from '../../types/game';
import capitalize from '../../utils/capitalize';

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
            {isThinking && <img src="./thinking.svg" alt="" style={{ height: '2.6rem' }} />}
            {hasAnswered && (
              <h1
                className="is-size-3 is-size-4-mobile"
                style={{ height: '3rem', lineHeight: '3rem' }}
              >
                {capitalize(lastWord)}
              </h1>
            )}
          </SpeechBubble>
        )}
        <img src={imageSrc} alt="" />
      </div>
      <h2 className="subtitle has-text-centered">{name}</h2>
    </section>
  );
};

export default Player;
