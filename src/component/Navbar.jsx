import { Link } from 'react-router-dom';
import logo from './assets/logo.jpeg'
import './Navbar.css'
function Navbar() {
  return (
    <nav className="navbar">
      <img src = {logo} width = "75px" height="75px"></img>
      <Link to="/">Home</Link> 
      <Link to="/about">About Us</Link>
      <Link to="/services">Our Services</Link>
      <Link to="/packages">Packages</Link>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/testimonials">Testimonials</Link>
    </nav>
  );
}

export default Navbar; // Make sure to export it!