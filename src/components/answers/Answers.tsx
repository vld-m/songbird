import React from 'react';

function Answer({ choices, onChoose }: { choices: string[]; onChoose: (answer: string) => void }) {
  const handleClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void = ({
    target,
  }) => {
    if (target instanceof HTMLLIElement) {
      onChoose(target.innerHTML);
    }
  };

  return (
    <ul>
      {choices.map((item) => (
        <li onClick={handleClick} key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default Answer;
