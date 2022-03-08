import React, { FunctionComponent, Fragment } from 'react';
import Routes from './routes';

import NavBar from './containers/NavBar';

import 'bulma/css/bulma.min.css';
import './styles/index.css';

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <header className="container">
        <NavBar />
      </header>

      <Routes />
    </Fragment>
  );
};

export default App;
