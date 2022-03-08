import React, { FunctionComponent } from 'react';
import GameManagerProvider from '../../context/GameManagerProvider';
import Play from './Play';

import names from '../../names.json';
import config from '../../config';

const PlayGame: FunctionComponent = () => {
  return (
    <GameManagerProvider
      turnTime={config.turnTime}
      aiOptions={{ lossPercentage: config.lossPercentage, timeToAnswer: config.timeToAnswer }}
      language="tr-TR"
      words={names}
    >
      <Play />
    </GameManagerProvider>
  );
};

export default PlayGame;
