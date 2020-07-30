import './Header.css';

import React from 'react';

// helpers
import { getListItemStageClassName } from '../../styleHelpers';

function Header({
  stageNames,
  stageNumber,
  score,
}: {
  stageNames: string[];
  stageNumber: number;
  score: number;
}) {
  const currentStageName = stageNames[stageNumber];

  return (
    <header className="header">
      <h1 className="title">Songbird</h1>
      <div className="score">Score: {score}</div>
      <nav className="navigation">
        <ul className="navigation__list">
          {stageNames.map((name) => (
            <li className={getListItemStageClassName(name, currentStageName)} key={name}>
              {name}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
