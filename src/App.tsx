import React, { FunctionComponent } from 'react';
import Routes from './routes';

import NavBar from './containers/NavBar';

import 'bulma/css/bulma.min.css';
import './styles/index.css';

const App: FunctionComponent = () => {
  return (
    <>
      <header className="container">
        <NavBar />
      </header>

      <Routes />
    </>
  );
};

export default App;
