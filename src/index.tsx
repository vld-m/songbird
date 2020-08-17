import './index.css';
import 'react-h5-audio-player/lib/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { GAME_DATA } from './data';

ReactDOM.render(
  <React.StrictMode>
    <App gameData={GAME_DATA} />
  </React.StrictMode>,
  document.getElementById('root')
);
