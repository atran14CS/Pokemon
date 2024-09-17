import { useEffect, useState, useCallback } from 'react';
import Navbar from '../componets/Navbar';
import Searchbar from '../componets/Searchbar';
import Card from '../componets/Card';
import './home.css';

const Home = () => {
  const offsetArr = [0, 251, 386, 493, 649, 721, 809, 905, 1025];
  const limitArr = [151, 100, 135, 107, 156, 72, 88, 96, 120];

  const [offset, setOffset] = useState(offsetArr[0]);
  const [limit, setLimit] = useState(limitArr[0]);
  const[sprite, setSprites] = useState([]);
  const [name, setNames] = useState("");

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

  const getByGens = async() => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const pokemonResults = await getRequest(url);
    console.log(pokemonResults.results);
    getCover(pokemonResults);
  }

  const getCover = (data) => {
    data.map(async (pokemon) => {
      const url = pokemon.url;
      const pokemonData = await getRequest(url);
      console.log(pokemonData);
    })
  }


  useEffect(() => {
    getByGens();
  })





  return (
    <div>
      <Navbar />
      <Searchbar />
      <div className="pokemon-list">
    
          <Card />

      </div>
     
    </div>
  );
};

export default Home;
