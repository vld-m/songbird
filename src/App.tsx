import './App.css';

import React, { useState } from 'react';

import Header from './components/header/Header';
import Answer from './components/answer/Answer';
import NextStage from './components/nextStage/NextStage';
import Results from './components/result/Result';

interface Bird {
  name: string;
  species: string;
}

interface Data {
  STAGES: {
    title: string;
    birds: Bird[];
  }[];
  MAX_STAGE_SCORE: number;
}

const prepareStageData = (rawStageData: Bird[]) => {
  const questions = rawStageData.map((bird) => bird.name);
  const answer = questions[Math.floor(Math.random() * questions.length)];

  return rawStageData.map((bird) => ({
    ...bird,
    isSelected: false,
    isAnswer: bird.name === answer,
  }));
};

function App({ data: { STAGES, MAX_STAGE_SCORE } }: { data: Data }) {
  const [score, setScore] = useState(0);

  const [stageNumber, setStageNumber] = useState(0);
  const [stageData, setStageData] = useState(() => prepareStageData(STAGES[stageNumber].birds));
  const [selectedBird, setSelectedBird] = useState('');
  const [stageScore, setStageScore] = useState(MAX_STAGE_SCORE);
  const [isStageClear, setIsStageClear] = useState(false);

  const handleAnswerChoose = (answer: string) => {
    if (selectedBird !== answer) {
      setSelectedBird(answer);
    }

    if (isStageClear) {
      return;
    }

    const bird = stageData.find(({ name }) => name === answer);

    if (bird === undefined || bird.isSelected) {
      return;
    }

    if (bird.isAnswer) {
      setScore(score + stageScore);
      setIsStageClear(true);

      return;
    }

    setStageScore(stageScore - 1);
    setStageData(
      stageData.map((bird) => (bird.name === answer ? { ...bird, isSelected: true } : bird))
    );
  };

  const handleStageChange = () => {
    setStageNumber(stageNumber + 1);
    setStageScore(MAX_STAGE_SCORE);
    setStageData(prepareStageData(STAGES[stageNumber + 1].birds));
    setSelectedBird('');
    setIsStageClear(false);
  };

  const handleGameRestart = () => {
    setScore(0);
    setStageScore(0);
    setStageNumber(0);
    setIsStageClear(false);
  };

  const isGameOver = stageNumber === STAGES.length;

  let content;

  if (isGameOver) {
    content = (
      <Results
        score={score}
        maxScore={MAX_STAGE_SCORE * STAGES.length}
        onRestart={handleGameRestart}
      />
    );
  } else {
    content = (
      <>
        <NextStage onChange={handleStageChange} disabled={!isStageClear} />
        <Answer choices={stageData.map(({ name }) => name)} onChoose={handleAnswerChoose} />
      </>
    );
  }

  return (
    <div className="app">
      <Header
        stageNames={STAGES.map(({ title }) => title)}
        stageNumber={stageNumber}
        score={score}
      />
      <main>{content}</main>
    </div>
  );
}

export default App;
