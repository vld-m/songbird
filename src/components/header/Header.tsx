import './Header.css';

import React from 'react';

function Header({
  score,
  currentGameStage,
  gameStages,
}: {
  score: number;
  currentGameStage: string;
  gameStages: string[];
}) {
  const getStageClassName = (stage: string, currentGameStage: string) =>
    'navigation__item' + (stage === currentGameStage ? ' navigation__item_selected' : '');

  return (
    <header className="header">
      <h1 className="title">Songbird</h1>
      <div className="score">Score: {score}</div>
      <nav className="navigation">
        <ul className="navigation__list">
          {gameStages.map((stage) => (
            <li className={getStageClassName(stage, currentGameStage)} key={stage}>
              {stage}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
