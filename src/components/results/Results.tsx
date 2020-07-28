import './Results.css';

import React from 'react';

import { getButtonClassName } from '../../styleHelpers';

function Results({
  onRestart,
  score,
  maxScore,
}: {
  onRestart: () => void;
  score: number;
  maxScore: number;
}) {
  return (
    <>
      <div>
        CONGRATS! Your score is {score} out of a {maxScore}
      </div>
      <button className={getButtonClassName(false)} onClick={onRestart}>
        Let's play one more time!
      </button>
    </>
  );
}

export default Results;
