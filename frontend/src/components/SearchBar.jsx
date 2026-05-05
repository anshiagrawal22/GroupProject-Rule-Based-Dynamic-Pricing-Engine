import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    babies: 0
  });

  const updateGuests = (type, amount) => {
    setGuests(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + amount)
    }));
  };

  const totalGuests = guests.adults + guests.children + guests.babies;
  
  return (
    <div className="search-bar-container">
      <div className="search-item">
        <div className="search-label">
          <MapPin size={16} /> Location
        </div>
        <input 
          type="text" 
          placeholder="Where are you going?" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="search-divider"></div>
      
      <div className="search-item">
        <div className="search-label">
          <Calendar size={16} /> Check in - Check out
        </div>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <input 
            type="date" 
            className="search-input"
            style={{ colorScheme: 'dark' }}
          />
          <span style={{color: 'rgba(255,255,255,0.7)'}}>-</span>
          <input 
            type="date" 
            className="search-input"
            style={{ colorScheme: 'dark' }}
          />
        </div>
      </div>
      
      <div className="search-divider"></div>
      
      <div className="search-item guest-picker-item" style={{ position: 'relative' }}>
        <div className="search-label">
          <Users size={16} /> Guests
        </div>
        <div 
          className="search-input-display" 
          onClick={() => setShowGuestPicker(!showGuestPicker)}
          style={{ cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', height: '100%', minHeight: '40px' }}
        >
          {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
        </div>

        {showGuestPicker && (
          <div className="guest-dropdown">
            <div className="guest-row">
              <div className="guest-info">
                <span className="guest-type">Adults</span>
                <span className="guest-desc">Age 13+</span>
              </div>
              <div className="guest-controls">
                <button type="button" onClick={() => updateGuests('adults', -1)} disabled={guests.adults <= 1}>-</button>
                <span>{guests.adults}</span>
                <button type="button" onClick={() => updateGuests('adults', 1)}>+</button>
              </div>
            </div>
            <div className="guest-row">
              <div className="guest-info">
                <span className="guest-type">Children</span>
                <span className="guest-desc">Ages 2-12</span>
              </div>
              <div className="guest-controls">
                <button type="button" onClick={() => updateGuests('children', -1)} disabled={guests.children <= 0}>-</button>
                <span>{guests.children}</span>
                <button type="button" onClick={() => updateGuests('children', 1)}>+</button>
              </div>
            </div>
            <div className="guest-row">
              <div className="guest-info">
                <span className="guest-type">Babies</span>
                <span className="guest-desc">Under 2</span>
              </div>
              <div className="guest-controls">
                <button type="button" onClick={() => updateGuests('babies', -1)} disabled={guests.babies <= 0}>-</button>
                <span>{guests.babies}</span>
                <button type="button" onClick={() => updateGuests('babies', 1)}>+</button>
              </div>
            </div>
            <button 
              type="button" 
              className="guest-done-btn"
              onClick={() => setShowGuestPicker(false)}
            >
              Done
            </button>
          </div>
        )}
      </div>
      
      <button className="search-btn" onClick={() => onSearch && onSearch(location)}>
        <Search size={20} />
        <span>Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
