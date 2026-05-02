import React from 'react';
import SearchBar from './SearchBar';
import './HeroSection.css';

const HeroSection = ({ onSearch }) => {
  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="hero-title">
          Find your next <br />
          <span className="gradient-text">perfect stay</span>
        </h1>
        <p className="hero-subtitle">
          Discover extraordinary hotels with AI-driven dynamic pricing for the best value.
        </p>
        
        <div className="hero-search-wrapper">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
