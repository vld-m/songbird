import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { GAME_DATA } from './constants';

ReactDOM.render(
  <React.StrictMode>
    <App data={GAME_DATA} />
  </React.StrictMode>,
  document.getElementById('root')
);
