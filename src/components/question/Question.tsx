import './Question.css';
import questionMark from './question.svg';

import React from 'react';

// hooks
import { useAudioPlayer, useImage } from '../../hooks/media';

// interfaces
import { StageBird } from '../../interfaces';

function Question({ bird: { isSelected, name, species } }: { bird: StageBird }) {
  const image = useImage(name);
  const audioPlayer = useAudioPlayer(species, isSelected);

  const nameStub = '***';
  const imageStub = <img className="bird__image" src={questionMark} alt={'Question mark'} />;

  return (
    <article className="question">
      <h2>{isSelected ? name : nameStub}</h2>
      {isSelected ? image : imageStub}
      {audioPlayer}
    </article>
  );
}

export default Question;
