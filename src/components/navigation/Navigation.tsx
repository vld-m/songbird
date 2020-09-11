import './Navigation.css';

import React from 'react';

const getListItemClassName = (stage: string, currentStage: string) =>
  stage === currentStage ? 'navigation__item_selected' : '';

function Navigation({ stageNames, stageNumber }: { stageNames: string[]; stageNumber: number }) {
  const currentStage = stageNames[stageNumber];

  return (
    <ul className="navigation">
      {stageNames.map((name) => (
        <li className={'navigation__item ' + getListItemClassName(name, currentStage)} key={name}>
          {name.toUpperCase()}
        </li>
      ))}
    </ul>
  );
}

export default Navigation;
