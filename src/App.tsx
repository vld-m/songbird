import './App.css';

import React from 'react';

// entities
import Header from './components/header/Header';
import Answer from './components/answer/Answer';
import Info from './components/info/Info';
import NextStage from './components/nextStage/NextStage';
import Result from './components/result/Result';

// hooks
import { useAppState } from './hooks';

// interfaces
import { GameData } from './interfaces';

function App({ gameData }: { gameData: GameData }) {
  const {
    score,
    isStageClear,
    stageNumber,
    stageData,
    currentBird,
    handleAnswer,
    handleStageChange,
    handleGameRestart,
  } = useAppState(gameData);

  const { STAGES, MAX_STAGE_SCORE } = gameData;

  let content;

  if (stageNumber < STAGES.length) {
    content = (
      <>
        <NextStage onChange={handleStageChange} disabled={!isStageClear} />
        <Answer answers={stageData} onAnswer={handleAnswer} />
        <Info bird={currentBird} />
      </>
    );
  } else {
    content = (
      <Result
        score={score}
        maxScore={MAX_STAGE_SCORE * STAGES.length}
        onRestart={handleGameRestart}
      />
    );
  }

  const stageNames = STAGES.map(({ title }) => title);

  return (
    <div className="app">
      <Header stageNames={stageNames} stageNumber={stageNumber} score={score} />
      <main>{content}</main>
    </div>
  );
}

export default App;
