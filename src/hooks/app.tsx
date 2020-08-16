import { useState, useEffect } from 'react';

import { Bird, GameData, StageBird } from '../interfaces';

const correctAnswerAudio = new Audio(
  'http://www.orangefreesounds.com/wp-content/uploads/2015/04/Game-show-correct-answer.mp3?_=1'
);
const wrongAnswerAudio = new Audio(
  'http://www.orangefreesounds.com/wp-content/uploads/2019/12/Error-beep-sound-effect.mp3?_=1'
);

const prepareStageData = (rawStageData: Bird[]): StageBird[] => {
  const questions = rawStageData.map((bird) => bird.name);
  const answer = questions[Math.floor(Math.random() * questions.length)];

  console.log('Правильный ответ на текущем уровне - ' + answer);

  return rawStageData.map((bird) => ({
    ...bird,
    isSelected: false,
    isAnswer: bird.name === answer,
  }));
};

const useApp = ({ STAGES, BIRD_STUB, MAX_STAGE_SCORE }: GameData) => {
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
      correctAnswerAudio.play();

      return;
    }

    setStageScore(stageScore - 1);
    wrongAnswerAudio.play();
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

export { useApp };
