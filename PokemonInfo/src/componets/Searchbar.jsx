import './Searchbar.css';
import { MdOutlineCatchingPokemon } from "react-icons/md";


const Searchbar = () => {

  return (
    <div id='searchbar'>
      <input type="text" placeholder='Search Pokemon'/>
      <div>
        <button><MdOutlineCatchingPokemon color='red' className='pokeball'/></button>
      </div>
    </div>
  );
};

export default Searchbar;
