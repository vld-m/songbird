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
  const imageStub = <img className="image_bird" src={questionMark} alt={'Question mark'} />;

  return (
    <section className="question">
      {isSelected ? image : imageStub}
      <div className="question__player">
        <h2 className="question__title">{isSelected ? name : nameStub}</h2>
        {audioPlayer}
      </div>
    </section>
  );
}

export default Question;
