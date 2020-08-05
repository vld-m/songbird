import './Description.css';

import React, { useRef } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';

import ClipLoader from 'react-spinners/ClipLoader';

// hooks
import { useAudioURL, useImageURL } from './hooks';

// interfaces
import { Bird } from '../../interfaces';

function Info({ bird: { name, species, description } }: { bird: Bird }) {
  const imageURL = useImageURL(name);
  const [audioURL, isAudioURLReady] = useAudioURL(species);
  const playerRef = useRef<AudioPlayer | null>(null);

  if (name === '') {
    return <p>Прослушайте запись и выберите птицу из списка</p>;
  }

  if (
    isAudioURLReady === false &&
    playerRef &&
    playerRef.current &&
    playerRef.current.audio &&
    playerRef.current.audio.current
  ) {
    playerRef.current.audio.current.pause();
    playerRef.current.audio.current.currentTime = 0;
  }

  return (
    <article className="info">
      <h2>{name}</h2>
      <a href={'https://ru.wikipedia.org/wiki/' + name}>
        <img className="info__image" src={imageURL} alt={name} />
      </a>
      <p>{species}</p>
      <AudioPlayer
        ref={playerRef}
        src={audioURL}
        autoPlayAfterSrcChange={false}
        showJumpControls={false}
        customControlsSection={
          isAudioURLReady ? [RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME_CONTROLS] : [<ClipLoader />]
        }
      />
      <p>{description}</p>
    </article>
  );
}

export default Info;
