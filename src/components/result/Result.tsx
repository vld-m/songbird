import './Result.css';

import React from 'react';

function Results({
  score,
  maxScore,
  onRestart,
}: {
  score: number;
  maxScore: number;
  onRestart: () => void;
}) {
  return (
    <>
      <div>
        CONGRATS! Your score is {score} out of a {maxScore}
      </div>
      <button className="button_next-stage" onClick={onRestart}>
        Let's play one more time!
      </button>
    </>
  );
}

export default Results;
