import React from 'react';

function Answer({ answers, onAnswer }: { answers: string[]; onAnswer: (answer: string) => void }) {
  const handleClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void = ({
    target,
  }) => {
    if (target instanceof HTMLLIElement) {
      onAnswer(target.innerHTML);
    }
  };

  return (
    <ul>
      {answers.map((answer) => (
        <li onClick={handleClick} key={answer}>
          {answer}
        </li>
      ))}
    </ul>
  );
}

export default Answer;
