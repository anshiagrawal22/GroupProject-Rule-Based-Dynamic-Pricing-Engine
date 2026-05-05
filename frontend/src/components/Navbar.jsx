import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, User, Menu, LogOut, ChevronDown } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import AuthModal from './AuthModal';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [region, setRegion] = useState('EN - USD');
  const location = useLocation();

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
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <span className="theme-logo-text" style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '1px' }}>AURÉVA</span>
          </div>
        </Link>

        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <a href="/#stays" className={`nav-link ${location.pathname === '/' && location.hash === '#stays' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            <span>Stays</span>
          </a>
          <a href="/#hero" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <span>About Us</span>
          </a>
          <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <span>More Info</span>
          </a>
          {user && user.role === 'admin' && (
            <Link to="/admin/reviews" className={`nav-link ${location.pathname === '/admin/reviews' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              <span>Dashboard</span>
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          <div className="region-selector-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button
              className="nav-icon-btn region-btn"
              onClick={() => setIsRegionOpen(!isRegionOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', width: 'auto', padding: '0 14px', height: '42px', borderRadius: '21px' }}
            >
              <Globe size={18} />
              <span className="region-text" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{region}</span>
              <ChevronDown size={14} />
            </button>

            {isRegionOpen && (
              <div className="region-dropdown">
                {['EN - INR', 'FR - EUR', 'ES - EUR', 'HI - INR'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setRegion(lang); setIsRegionOpen(false); }}
                    className="region-item"
                    style={{
                      fontWeight: region === lang ? 700 : 500
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <div className="user-profile-nav">
              <span className="user-name-text">Hi, {user.name.split(' ')[0]}</span>
              <button className="logout-btn" onClick={logout} title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button className="auth-trigger-btn" onClick={() => setIsAuthOpen(true)}>
              <Menu size={18} />
              <User size={18} />
            </button>
          )}

          <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>

      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </nav>
  );
};

export default Navbar;
