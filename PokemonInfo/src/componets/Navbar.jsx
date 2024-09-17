import logo from '../photos/navlogo.png';
import '../componets/Navbar.css';

const Navbar = () => {
  return (
    <nav id="home">
      <img src={logo} id='pokemon-logo' alt="pokemon-logo" />
      <div className="nav-links">
        <a href="#home" className='nav-op'><h2 className='nav-op'>Home</h2></a>
        <a href="#search" className='nav-op'><h2 className='nav-op'>Search</h2></a>
        <a href="#contact" className='nav-op'><h2 className='nav-op'>Contact</h2></a>
      </div>
    </nav>
  )
}

export default Navbar
