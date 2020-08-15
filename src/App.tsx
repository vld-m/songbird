import './App.css';

import React from 'react';

// entities
import Navigation from './components/navigation/Navigation';
import Question from './components/question/Question';
import Quiz from './components/quiz/Quiz';
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

  const getMainContent = () => {
    if (stageNumber < STAGES.length && stageAnswer) {
      return (
        <>
          <Question bird={stageAnswer} />
          <section className="answer">
            <Quiz answers={stageData} onAnswer={handleAnswer} />
            <Info bird={currentBird} />
          </section>
          <NextStage onChange={handleStageChange} disabled={!isStageClear} />
        </>
      );
    }

    return (
      <Result
        score={score}
        maxScore={MAX_STAGE_SCORE * STAGES.length}
        onRestart={handleGameRestart}
      />
    );
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">
          SONG<span className="title_tomato">BIRD</span>
        </h1>
        <div>
          <span className="score">СЧЁТ: </span>
          {score}
        </div>
      </header>
      <Navigation stageNames={stageNames} stageNumber={stageNumber} />
      <main>{getMainContent()}</main>
    </div>
  );
}

export default App;
