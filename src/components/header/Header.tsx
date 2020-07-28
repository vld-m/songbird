import './Header.css';

import React from 'react';

import { getListItemStageClassName } from '../../styleHelpers';

function Header({
  score,
  currentGameStage,
  gameStages,
}: {
  score: number;
  currentGameStage: string;
  gameStages: string[];
}) {
  return (
    <header className="header">
      <h1 className="title">Songbird</h1>
      <div className="score">Score: {score}</div>
      <nav className="navigation">
        <ul className="navigation__list">
          {gameStages.map((stage) => (
            <li className={getListItemStageClassName(stage, currentGameStage)} key={stage}>
              {stage}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
