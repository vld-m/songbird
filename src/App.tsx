import './App.css';

import React from 'react';

// entities
import Header from './components/header/Header';
import Question from './components/question/Question';
import Answer from './components/answer/Answer';
import Info from './components/info/Info';
import NextStage from './components/nextStage/NextStage';
import Result from './components/result/Result';

// hooks
import { useApp } from './hooks/app';

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
  } = useApp(gameData);

  const { STAGES, MAX_STAGE_SCORE } = gameData;
  const stageNames = STAGES.map(({ title }) => title);
  const stageAnswer = stageData.find((bird) => bird.isAnswer);

  let content;

  if (stageNumber < STAGES.length && stageAnswer) {
    content = (
      <>
        <NextStage onChange={handleStageChange} disabled={!isStageClear} />
        <Question bird={stageAnswer} />
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

  return (
    <div className="app">
      <Header stageNames={stageNames} stageNumber={stageNumber} score={score} />
      <main>{content}</main>
    </div>
  );
}

export default App;
