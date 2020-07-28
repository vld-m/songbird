import './App.css';

import React, { useState } from 'react';

import Header from './components/header/Header';

import { GAME_STAGES } from './constants';

function App() {
  const [score, setScore] = useState(0);
  const [stageNumber, setStageNumber] = useState(0);

  return (
    <div className="app">
      <Header score={score} currentGameStage={GAME_STAGES[stageNumber]} gameStages={GAME_STAGES} />
    </div>
  );
}

export default App;
