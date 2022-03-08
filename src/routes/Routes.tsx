import React, { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import GameManagerProvider from '../context/GameManagerProvider';

import Home from './Home';
import HowToPlay from './HowToPlay';
import Play from './Play';

import names from '../names.json';

const AppRoutes: FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/how-to-play" element={<HowToPlay />} />
    <Route
      path="/play"
      element={
        <GameManagerProvider
          timer={8}
          aiOptions={{
            lossPercentage: 20,
            timeToAnswer: 3,
          }}
          language="tr-TR"
          words={names}
        >
          <Play />
        </GameManagerProvider>
      }
    />
  </Routes>
);

export default AppRoutes;
