import React, { useState, useEffect } from 'react';
import { Plane, Hotel, Car, Globe, User, Menu } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="navbar-logo">
          <div className="logo-icon">
            <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Voya</span>
          </div>
        </div>

        <div className="navbar-links">
          <a href="#" className="nav-link active">
            <Hotel size={18} />
            <span>Stays</span>
          </a>
          <a href="#" className="nav-link">
            <Plane size={18} />
            <span>Villas</span>
          </a>
          <a href="#" className="nav-link">
            <Car size={18} />
            <span>Camps</span>
          </a>
        </div>

        <div className="navbar-actions">
          <button className="nav-icon-btn">
            <Globe size={20} />
          </button>
          <button className="btn btn-outline login-btn">
            <Menu size={18} />
            <User size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
