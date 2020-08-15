import './Navigation.css';

import React from 'react';

// helpers
import { getListItemStageClassName } from '../../styleHelpers';

function Navigation({ stageNames, stageNumber }: { stageNames: string[]; stageNumber: number }) {
  const currentStageName = stageNames[stageNumber];

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {stageNames.map((name) => (
          <li className={getListItemStageClassName(name, currentStageName)} key={name}>
            {name}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
