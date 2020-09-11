import './Info.css';

import React from 'react';

// hooks
import { useAudioPlayer, useImage } from '../../hooks/media';

// interfaces
import { StageBird } from '../../interfaces';

function Info({ bird: { name, species, description } }: { bird: StageBird }) {
  const image = useImage(name);
  const audioPlayer = useAudioPlayer(species, false);

  if (name === '') {
    return <p className="info">Прослушайте запись и выберите птицу из списка</p>;
  }

  return (
    <article className="info">
      {image}
      <div className="info__wrapper">
        <h2 className="info__title">{name}</h2>
        <p>{species}</p>
        {audioPlayer}
      </div>
      <p className="info__description">{description}</p>
    </article>
  );
}

export default Info;
