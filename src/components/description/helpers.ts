import { useState, useEffect } from 'react';

interface Response {
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

const URL_CACHE = new Map();

const getRequestURL = (title: string) => {
  const params = {
    action: 'query',
    format: 'json',
    prop: 'pageimages',
    piprop: 'original',
    titles: title,
  };

  const keys = Object.keys(params) as Array<keyof typeof params>;

  return keys.reduce((result, key) => {
    return result + '&' + key + '=' + params[key];
  }, 'https://ru.wikipedia.org/w/api.php?origin=*');
};

const useImageURL = (title: string) => {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (title === '') {
      return;
    }

    if (URL_CACHE.has(title)) {
      setImageURL(URL_CACHE.get(title));
    }

    const fetchImageURL = async () => {
      const response = await fetch(getRequestURL(title));
      const {
        query: { pages },
      }: Response = await response.json();
      const {
        original: { source: imageURL },
      } = Object.values(pages)[0];

      URL_CACHE.set(title, imageURL);

      setImageURL(imageURL);
    };

    fetchImageURL();
  }, [title]);

  return imageURL;
};

export { useImageURL };
