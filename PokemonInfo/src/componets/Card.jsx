import './Card.css';
import { useState } from 'react';

const Card = ({ name, sprite, id }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      id="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 className={hovered ? 'show' : 'hide'}>#{id}</h3>
      <img
        src={sprite}
        alt={name}
        className="pokemonSprite"
      />
      <h1 id={name} className={hovered ? 'show name-bar' : 'hide name-bar'}>{name}</h1>
    </div>
  );
};

export default Card;
