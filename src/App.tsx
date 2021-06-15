import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStye from './styles/global';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStye />
  </>
);

export default App;
