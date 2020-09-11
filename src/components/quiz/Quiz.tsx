import './Quiz.css';
import React from 'react';

// interfaces
import { StageBird } from '../../interfaces';

function Quiz({ answers, onAnswer }: { answers: StageBird[]; onAnswer: (answer: string) => void }) {
  const handleClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void = ({
    target,
  }) => {
    if (target instanceof HTMLLIElement) {
      onAnswer(target.innerHTML);
    }
  };

  const getAnswerClassName = ({ isAnswer, isSelected }: StageBird) => {
    if (isSelected) {
      if (isAnswer) {
        return 'quiz__item_rigth';
      }

      return 'quiz__item_wrong';
    }

    return '';
  };

  return (
    <ul className="quiz">
      {answers.map((answer) => (
        <li
          onClick={handleClick}
          key={answer.name}
          className={'quiz__item ' + getAnswerClassName(answer)}
        >
          {answer.name}
        </li>
      ))}
    </ul>
  );
}

export default Quiz;
