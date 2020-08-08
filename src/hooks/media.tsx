import React, { useState, useEffect, useRef } from 'react';

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import ClipLoader from 'react-spinners/ClipLoader';

interface AudioURLResponse {
  recordings: { file: string }[];
}

interface ImageURLResponse {
  query: {
    pages: {
      [pageNumber: string]: {
        original: {
          source: string;
        };
      };
    };
  };
}

const AUDIOS_URL_CACHE = new Map();
const IMAGES_URL_CACHE = new Map();

const getAudioRequestURL = (title: string) => {
  const titleArray = title.split(' ');

  return titleArray.reduce(
    (url, item, index) => url + item.toLowerCase() + (index < titleArray.length - 1 ? '+' : ''),
    'https://cors-anywhere.herokuapp.com/https://www.xeno-canto.org/api/2/recordings?query='
  );
};

const getImageRequestURL = (title: string) => {
  const params = {
    action: 'query',
    format: 'json',
    prop: 'pageimages',
    piprop: 'original',
    titles: title,
  };

  const keys = Object.keys(params) as Array<keyof typeof params>;

  return keys.reduce(
    (url, key) => url + '&' + key + '=' + params[key],
    'https://ru.wikipedia.org/w/api.php?origin=*'
  );
};

const useAudioURL = (title: string): [string, boolean] => {
  const [URL, setURL] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);

    if (title === '') {
      return;
    }

    if (AUDIOS_URL_CACHE.has(title)) {
      setURL(AUDIOS_URL_CACHE.get(title));
      setIsReady(true);

      return;
    }

    const fetchAudioURL = async () => {
      const response = await fetch(getAudioRequestURL(title));
      const {
        recordings: [{ file: URL }],
      }: AudioURLResponse = await response.json();

      AUDIOS_URL_CACHE.set(title, URL);

      setURL(URL);
      setIsReady(true);
    };

    fetchAudioURL();
  }, [title]);

  return [URL, isReady];
};

const useImageURL = (title: string) => {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (title === '') {
      return;
    }

    if (IMAGES_URL_CACHE.has(title)) {
      setImageURL(IMAGES_URL_CACHE.get(title));

      return;
    }

    const fetchImageURL = async () => {
      const response = await fetch(getImageRequestURL(title));
      const {
        query: { pages },
      }: ImageURLResponse = await response.json();
      const {
        original: { source: imageURL },
      } = Object.values(pages)[0];

      IMAGES_URL_CACHE.set(title, imageURL);

      setImageURL(imageURL);
    };

    fetchImageURL();
  }, [title]);

  return imageURL;
};

const useAudioPlayer = (species: string, forceStop: boolean) => {
  const [audioURL, isAudioURLReady] = useAudioURL(species);
  const playerRef = useRef<AudioPlayer | null>(null);

  if (
    (isAudioURLReady === false || forceStop) &&
    playerRef &&
    playerRef.current &&
    playerRef.current.audio &&
    playerRef.current.audio.current
  ) {
    playerRef.current.audio.current.pause();
    playerRef.current.audio.current.currentTime = 0;
  }

  return (
    <AudioPlayer
      ref={playerRef}
      src={audioURL}
      autoPlayAfterSrcChange={false}
      showJumpControls={false}
      customControlsSection={
        isAudioURLReady ? [RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME_CONTROLS] : [<ClipLoader />]
      }
    />
  );
};

const useImage = (name: string) => {
  const imageURL = useImageURL(name);

  return (
    <a href={'https://ru.wikipedia.org/wiki/' + name}>
      <img className="bird__image" src={imageURL} alt={name} />
    </a>
  );
};

export { useImage, useAudioPlayer };
