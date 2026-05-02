import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  
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
      
      <div className="search-item">
        <div className="search-label">
          <Users size={16} /> Guests
        </div>
        <input 
          type="number" 
          placeholder="2" 
          min="1"
          className="search-input"
          style={{ colorScheme: 'dark' }}
        />
      </div>
      
      <button className="search-btn" onClick={() => onSearch && onSearch(location)}>
        <Search size={20} />
        <span>Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
