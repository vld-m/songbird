import { useState, useEffect } from 'react';

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

export { useAudioURL, useImageURL };
