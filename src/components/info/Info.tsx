import './Info.css';

import React from 'react';

// hooks
import { useAudioPlayer, useImage } from '../../hooks/media';

// interfaces
import { StageBird } from '../../interfaces';

function Info({ bird: { name, species, description } }: { bird: StageBird }) {
  const image = useImage(name);
  const audioPlayer = useAudioPlayer(species);

  if (name === '') {
    return <p>Прослушайте запись и выберите птицу из списка</p>;
  }

  return (
    <article className="info">
      <h2>{name}</h2>
      {image}
      <p>{species}</p>
      {audioPlayer}
      <p>{description}</p>
    </article>
  );
}

export default Info;
