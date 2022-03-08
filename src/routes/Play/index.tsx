import React, { FunctionComponent } from 'react';
import GameManagerProvider from '../../context/GameManagerProvider';
import Play from './Play';

import names from '../../names.json';

const PlayGame: FunctionComponent = () => {
  return (
    <GameManagerProvider
      timer={8}
      aiOptions={{ lossPercentage: 20, timeToAnswer: 3 }}
      language="tr-TR"
      words={names}
    >
      <Play />
    </GameManagerProvider>
  );
};

export default PlayGame;
