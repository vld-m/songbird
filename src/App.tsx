import './App.css';

import React, { useState } from 'react';

import Header from './components/header/Header';
import Answer from './components/answer/Answer';
import Info from './components/description/Description';
import NextStage from './components/nextStage/NextStage';
import Result from './components/result/Result';

interface Bird {
  name: string;
  species: string;
  description: string;
}

interface Data {
  STAGES: {
    title: string;
    birds: Bird[];
  }[];
  BIRD_STUB: Bird;
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

function App({ data: { STAGES, MAX_STAGE_SCORE, BIRD_STUB } }: { data: Data }) {
  const [score, setScore] = useState(0);

  const [isStageClear, setIsStageClear] = useState(false);
  const [stageScore, setStageScore] = useState(MAX_STAGE_SCORE);
  const [stageNumber, setStageNumber] = useState(0);

  const stageBirds = STAGES[stageNumber].birds;
  const [stageData, setStageData] = useState(() => prepareStageData(stageBirds));
  const [selectedBird, setSelectedBird] = useState(BIRD_STUB);

  const handleAnswerChoose = (answer: string) => {
    if (selectedBird.name !== answer) {
      const newBird = stageBirds.find(({ name }) => name === answer);

      if (newBird === undefined) {
        return;
      }

      setSelectedBird(newBird);
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
    setSelectedBird(BIRD_STUB);
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
      <Result
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
        <Info bird={selectedBird} />
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
