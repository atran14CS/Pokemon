import './Card.css';
import { useState } from 'react';

const Card = ({ pokemonName, sprite }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={sprite}
        alt={pokemonName}
        className="pokemonSprite"
      />
      <h1 id="pokemonName" className={hovered ? 'show' : 'hide'}>
        {pokemonName}
      </h1>
    </div>
  );
};

export default Card;
