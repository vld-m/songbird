import './Header.css';

import React from 'react';

import { getListItemStageClassName } from '../../styleHelpers';

function Header({
  stages,
  currentStage,
  score,
}: {
  stages: string[];
  currentStage: string;
  score: number;
}) {
  return (
    <header className="header">
      <h1 className="title">Songbird</h1>
      <div className="score">Score: {score}</div>
      <nav className="navigation">
        <ul className="navigation__list">
          {stages.map((stage) => (
            <li className={getListItemStageClassName(stage, currentStage)} key={stage}>
              {stage}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
