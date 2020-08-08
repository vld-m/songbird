import React from 'react';

// interfaces
import { StageBird } from '../../interfaces';

function Answer({
  answers,
  onAnswer,
}: {
  answers: StageBird[];
  onAnswer: (answer: string) => void;
}) {
  const handleClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void = ({
    target,
  }) => {
    if (target instanceof HTMLLIElement) {
      onAnswer(target.innerHTML);
    }
  };

  const getAnswerStyle = ({ isAnswer, isSelected }: StageBird) => {
    if (isSelected) {
      if (isAnswer) {
        return { borderLeft: '3px solid green' };
      }

      return { borderLeft: '3px solid red' };
    }

    return { borderLeft: '' };
  };

  return (
    <ul>
      {answers.map((answer) => (
        <li onClick={handleClick} key={answer.name} style={getAnswerStyle(answer)}>
          {answer.name}
        </li>
      ))}
    </ul>
  );
}

export default Answer;
