import './Searchbar.css';
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { useState } from 'react';


const Searchbar = () => {

  const [search, setSearch] = useState("");

  console.log(search);

  const handleSearch = async (e) => {
    e.preventDefualt;
    console.log(search);
  }

  return (
    <div id='searchbar'>
      <input type="text" placeholder='Search Pokemon' onChange={e => {setSearch(e.target.value)}}/>
      <div>
        <button><MdOutlineCatchingPokemon color='red' className='pokeball' onClick={handleSearch}/></button>
      </div>
    </div>
  );
};

export default Searchbar;
