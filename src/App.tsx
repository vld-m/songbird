import './App.css';

import React, { useState } from 'react';

import Header from './components/header/Header';
import Results from './components/results/Results';
import ButtonNextStage from './components/buttonNextStage/ButtonNextStage';

import { GAME_STAGES, MAX_STAGE_SCORE } from './constants';

function App() {
  const [score, setScore] = useState(0);
  const [stageScore, setStageScore] = useState(MAX_STAGE_SCORE);
  const [stageNumber, setStageNumber] = useState(0);
  const [isStageClear, setIsStageClear] = useState(true);

  const handleStageChange = () => setStageNumber((number) => number + 1);
  const handleGameRestart = () => {
    setScore(0);
    setStageScore(0);
    setStageNumber(0);
    setIsStageClear(false);
  };

  const isGameOver = stageNumber === GAME_STAGES.length;

  let content;

  if (isGameOver) {
    content = (
      <Results
        score={score}
        maxScore={MAX_STAGE_SCORE * GAME_STAGES.length}
        onRestart={handleGameRestart}
      />
    );
  } else {
    content = <ButtonNextStage disabled={isStageClear} onStageChange={handleStageChange} />;
  }

  return (
    <div className="app">
      <Header stages={GAME_STAGES} currentStage={GAME_STAGES[stageNumber]} score={score} />
      <main>{content}</main>
    </div>
  );
}

export default App;
