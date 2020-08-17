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
  const message =
    score === maxScore
      ? `Поздравляем! Вы безошибочно ответили на все вопросы и набрали ${maxScore} очков!`
      : `Поздравляем! Вы набрали ${score} из ${maxScore} возможных!`;

  return (
    <div className="result">
      <p className="result__message">{message}</p>
      <button className="button_next-stage" onClick={onRestart}>
        Сыграем ещё?
      </button>
    </div>
  );
}

export default Results;
