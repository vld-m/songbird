import { useState } from 'react';

import { Bird, GameData, StageBird } from '../interfaces';

const correctAnswerAudio = new Audio(
  'https://freesound.org/data/previews/253/253887_3169537-lq.mp3'
);
const wrongAnswerAudio = new Audio('https://freesound.org/data/previews/253/253886_3169537-lq.mp3');

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
      try {
        correctAnswerAudio.play();
      } catch (e) {
        console.log(e);
      }

      return;
    }

    setStageScore(stageScore - 1);

    try {
      wrongAnswerAudio.play();
    } catch (e) {
      console.log(e);
    }
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
    setStageNumber(stageNumber + 1);

    if (STAGES[stageNumber + 1] === undefined) {
      return;
    }

    setIsStageClear(false);
    setStageScore(MAX_STAGE_SCORE);
    setStageData(prepareStageData(STAGES[stageNumber + 1].birds));
    setCurrentBird(BIRD_STUB);
  };

  const handleGameRestart = () => {
    setScore(0);
    setIsStageClear(false);
    setStageNumber(0);
    setStageScore(MAX_STAGE_SCORE);
    setStageData(prepareStageData(STAGES[0].birds));
    setCurrentBird(BIRD_STUB);
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
