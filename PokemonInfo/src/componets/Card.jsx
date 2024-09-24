import './Card.css';
import { useState } from 'react';

const Card = ({ name, sprite, number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      id="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h4>{number}</h4>
      <img
        src={sprite}
        alt={name}
        className="pokemonSprite"
      />
      <h1 id={name} className={hovered ? 'show' : 'hide'}>{name}</h1>
    </div>
  );
};

export default Card;
