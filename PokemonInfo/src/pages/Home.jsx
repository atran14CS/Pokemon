import { useEffect, useState, useCallback } from 'react';
import Navbar from '../componets/Navbar';
import Searchbar from '../componets/Searchbar';
import Card from '../componets/Card';
import './home.css';

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]); // able to change and hold the pokemon data
  const [offset, setOffset] = useState(0); // able to change the offset amount and also store the offset number 
  const [loading, setLoading] = useState(false); // keeps track if loading or not and change boolean value
  const batchSize = 30; // how many pokemon can be loaded at one instance
  const totalPokemon = 151; // total number of pokemon

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

  // Function to fetch Pokémon in batches
  const getPokemonBatch = async () => {
    if (offset >= totalPokemon) return; // Stop fetching if total is reached
    setLoading(true);
    const remainingPokemon = totalPokemon - offset;
    const limit = Math.min(batchSize, remainingPokemon); // Adjust the batch size if it exceeds totalPokemon
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    const pokemonData = await getRequest(url);
    if (pokemonData && pokemonData.results) {
      const pokemonDetails = await fetchInBatches(pokemonData.results, 10);
      setPokemonData((prevData) => [...prevData, ...pokemonDetails]);
      setOffset((prevOffset) => prevOffset + limit);  // Increment by the actual number of fetched Pokémon
    } else {
      console.error("No Pokémon data found");
    }
    setLoading(false);
  };

  // Fetch Pokémon sprites in batches to avoid overloading the API
  const fetchInBatches = async (pokemonList, batchSize = 10) => {
    let pokemonDetails = [];
    for (let i = 0; i < pokemonList.length; i += batchSize) {
      const batch = pokemonList.slice(i, i + batchSize);
      const results = await Promise.all(
        batch.map(async (pokemon) => {
          const details = await getRequest(pokemon.url);
          if (details && details.sprites) {
            return {
              name: details.name,
              sprite: details.sprites.other["official-artwork"].front_default,
            };
          } else {
            console.error(`Failed to fetch details for ${pokemon.name}`);
            return null;
          }
        })
      );
      pokemonDetails = [...pokemonDetails, ...results.filter(p => p !== null)];
    }
    return pokemonDetails;
  };

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const bottomReached = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100;
    if (bottomReached && !loading && offset < totalPokemon && pokemonData.length < totalPokemon) {
      getPokemonBatch();
    }
  }, [loading, offset, pokemonData]);  

  useEffect(() => {
    // Initial load of Pokémon
    getPokemonBatch();

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup scroll event listener when totalPokemon is reached
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    // If we've loaded all Pokémon, stop scrolling
    if (pokemonData.length >= totalPokemon) {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [pokemonData.length, handleScroll]);

  return (
    <div>
      <Navbar />
      <Searchbar />
      <div className="pokemon-list">
        {pokemonData.map((pokemon, index) => (
          <Card key={index} pokemonName={pokemon.name} sprite={pokemon.sprite} />
        ))}
      </div>
      {loading && <p>Loading more Pokémon...</p>}  {/* Loading spinner or message */}
    </div>
  );
};

export default Home;
