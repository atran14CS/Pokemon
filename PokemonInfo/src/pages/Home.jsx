import { useEffect, useState, useCallback } from 'react';
import Navbar from '../componets/Navbar';
import Searchbar from '../componets/Searchbar';
import Card from '../componets/Card';
import './home.css';

const Home = () => {
  const offsetArr = [0, 151, 251, 386];
  const limitArr = [151, 100, 135, 107];

  const [offset, setOffset] = useState(offsetArr[0]);
  const [limit, setLimit] = useState(limitArr[0]);
  const [pokemon, setPokemon] = useState([]);

  // Function to make API get requests
  const getRequest = async (url) => {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch data from:", url, error);
    }
  };

  // Fetch Pokémon list based on generation
  const getByGens = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const pokemonResults = await getRequest(url);
    if (pokemonResults && pokemonResults.results) {
      const getSpriteName = await getCover(pokemonResults.results);
      setPokemon(getSpriteName);
    }
    console.log(pokemon);
  };

  // Fetch details for each Pokémon (sprite and name)
  const getCover = async (data) => {
    const promises = data.map(async (pokemon) => {
      const details = await getRequest(pokemon.url);
      if (details && details.sprites) {
        return {
          name: details.name,
          sprite: details.sprites.other['official-artwork'].front_default,
        };
      } else {
        console.error(`Failed to fetch data for ${pokemon.name}`);
        return null;
      }
    });

    // Wait for all promises to resolve
    const results = await Promise.all(promises);
    // Filter out any null results (in case of errors)
    return results.filter(pokemon => pokemon !== null);
  };

  // useEffect to trigger the API call when component mounts
  useEffect(() => {
    getByGens();
  }, [offset, limit]);

  return (
    <div>
      <Navbar />
      <Searchbar />
      <div className="pokemon-list">
        {pokemon.map((poke, index) => (
          <Card key={index} name={poke.name} sprite={poke.sprite} />
        ))}
      </div>
    </div>
  );
};

export default Home;