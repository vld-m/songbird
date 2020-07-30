import './Description.css';

import React from 'react';

import { useImageURL } from './helpers';

interface Bird {
  name: string;
  species: string;
  description: string;
}

function Info({ bird: { name, species, description } }: { bird: Bird }) {
  const wikiURL = 'https://ru.wikipedia.org/wiki/' + name;
  const imageURL = useImageURL(name);

  if (name === '') {
    return <p>Прослушайте запись и выберите птицу из списка</p>;
  }

  return (
    <article className="info">
      <h2>{name}</h2>
      <a href={wikiURL}>
        <img className="info__image" src={imageURL} alt={name} />
      </a>
      <p>{species}</p>
      <p>{description}</p>
    </article>
  );
}

export default Info;
