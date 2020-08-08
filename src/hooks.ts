import { useState } from 'react';

import { Bird, GameData, StageBird } from './interfaces';

const prepareStageData = (rawStageData: Bird[]): StageBird[] => {
  const questions = rawStageData.map((bird) => bird.name);
  const answer = questions[Math.floor(Math.random() * questions.length)];

  return rawStageData.map((bird) => ({
    ...bird,
    isSelected: false,
    isAnswer: bird.name === answer,
  }));
};

const useAppState = ({ STAGES, BIRD_STUB, MAX_STAGE_SCORE }: GameData) => {
  const [score, setScore] = useState(0);

  const [isStageClear, setIsStageClear] = useState(false);
  const [stageNumber, setStageNumber] = useState(0);
  const [stageScore, setStageScore] = useState(MAX_STAGE_SCORE);
  const [stageData, setStageData] = useState(() => prepareStageData(STAGES[stageNumber].birds));

  const [currentBird, setCurrentBird] = useState(BIRD_STUB);

  const updateStageState = ({ isAnswer, name }: StageBird): void => {
    const updatedStageData = stageData.map((bird) =>
      bird.name === name ? { ...bird, isSelected: true } : bird
    );

    setStageData(updatedStageData);

    if (isAnswer) {
      setIsStageClear(true);
      setScore(score + stageScore);

      return;
    }

    setStageScore(stageScore - 1);
  };

  const handleAnswer = (answer: string) => {
    const bird = stageData.find(({ name }) => name === answer);

    if (bird === undefined) {
      return;
    }

    setCurrentBird(bird);

    if (isStageClear || bird.isSelected) {
      return;
    }

    updateStageState(bird);
  };

  const handleStageChange = () => {
    setIsStageClear(false);
    setStageNumber(stageNumber + 1);
    setStageScore(MAX_STAGE_SCORE);
    setStageData(prepareStageData(STAGES[stageNumber + 1].birds));
    setCurrentBird(BIRD_STUB);
  };

  const handleGameRestart = () => {
    setScore(0);
    setIsStageClear(false);
    setStageNumber(0);
    setStageScore(0);
  };

  return {
    score,
    stageNumber,
    stageData,
    isStageClear,
    currentBird,
    handleAnswer,
    handleStageChange,
    handleGameRestart,
  };
};

export { useAppState };
