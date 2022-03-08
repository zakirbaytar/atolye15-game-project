import React, { FunctionComponent } from 'react';

import useAudioPermission from '../../hooks/useAudioPermission';
import useGameManager from '../../hooks/useGameManager';

import Timer from '../../components/Timer';
import PlayerSelectionControls from './PlayerSelectionControls';

import Player from '../../containers/Player';
import GameOverModal from './GameOverModal';
import AudioPermissionModal from '../../containers/AudioPermissionModal';

import { GameState, Turn } from '../../types/game';

import './style.css';

const Play: FunctionComponent = () => {
  const { askForPermission } = useAudioPermission();
  const { startNewGame, gameState, turnTime, timeLeft } = useGameManager();

  return (
    <main className="container play-container is-max-widescreen">
      <AudioPermissionModal />
      <GameOverModal />
      <section className="section">
        <div className="columns is-mobile">
          <div className="column is-5-desktop is-5-tablet is-4-mobile">
            <Player name="Bilgisayar" imageSrc="./ai.svg" position="left" turn={Turn.Computer} />
          </div>
          <div className="column is-4-mobile is-flex is-justify-content-center is-align-content-center">
            {gameState === GameState.Started ? (
              <Timer seconds={turnTime} timeLeft={timeLeft} />
            ) : (
              <div className="buttons">
                <button
                  type="button"
                  className="button is-responsive is-primary is-align-self-center"
                  onClick={() => {
                    askForPermission(() => {
                      startNewGame();
                    });
                  }}
                >
                  Yeni Oyuna Başla
                </button>
              </div>
            )}
          </div>
          <div className="column is-5-desktop is-5-tablet is-4-mobile">
            <Player name="Siz" imageSrc="./player.svg" position="right" turn={Turn.Player} />
          </div>
        </div>
      </section>
      {gameState !== GameState.Started && (
        <section className="is-flex is-flex-direction-column is-align-items-center">
          <p className="is-size-7 mb-2">Oyuna kimin başlayacağını seç</p>
          <PlayerSelectionControls />
        </section>
      )}
    </main>
  );
};

export default Play;
