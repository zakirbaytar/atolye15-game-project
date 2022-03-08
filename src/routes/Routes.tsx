import React, { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import HowToPlay from './HowToPlay';
import Play from './Play';

const AppRoutes: FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/how-to-play" element={<HowToPlay />} />
    <Route path="/play" element={<Play />} />
  </Routes>
);

export default AppRoutes;
