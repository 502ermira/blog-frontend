import React, { useEffect, useState } from 'react';
import { GrHomeRounded } from "react-icons/gr";
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="menu-icon" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <GrHomeRounded />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <button className='button nav-button' onClick={() => window.location.href = 'mailto:Ermiraaa20@gmail.com'}>
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
