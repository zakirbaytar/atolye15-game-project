import React, { FunctionComponent } from 'react';
import Routes from './routes';

import PermissionProvider from './context/PermissionProvider';
import NavBar from './containers/NavBar';

import 'bulma/css/bulma.min.css';
import './styles/index.css';

const App: FunctionComponent = () => {
  return (
    <PermissionProvider>
      <header className="container">
        <NavBar />
      </header>
      <Routes />
    </PermissionProvider>
  );
};

export default App;
