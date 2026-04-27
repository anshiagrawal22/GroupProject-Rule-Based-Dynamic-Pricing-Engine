import React, { useState, useMemo } from 'react';
import HotelCard from './HotelCard';
import { mockHotels, calculatePrice } from '../data/mockHotels';
import './HotelList.css';

const HotelList = ({ searchLocation }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');

  const categories = ['All', 'Mountains', 'City'];

  const processedHotels = useMemo(() => {
    let result = mockHotels;

    // 1. Filter by Search Location
    if (searchLocation && searchLocation.trim() !== '') {
      result = result.filter(hotel => 
        hotel.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
        hotel.name.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    // 2. Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter(hotel => hotel.category === activeCategory);
    }

    // 3. Pre-calculate prices for sorting
    const hotelsWithPrice = result.map(hotel => {
      const { finalPrice } = calculatePrice(hotel.pricing.basePrice, hotel.pricing.dynamicFactors);
      return { ...hotel, computedPrice: finalPrice };
    });

    // 4. Sort
    if (sortBy === 'price-low') {
      hotelsWithPrice.sort((a, b) => a.computedPrice - b.computedPrice);
    } else if (sortBy === 'price-high') {
      hotelsWithPrice.sort((a, b) => b.computedPrice - a.computedPrice);
    }

    return hotelsWithPrice;
  }, [searchLocation, activeCategory, sortBy]);

  return (
    <section className="hotel-list-section">
      <div className="container">
        <div className="section-header" style={{ flexWrap: 'wrap' }}>
          <div>
            <h2 className="section-title">
              {searchLocation ? `Search Results for "${searchLocation}"` : "Trending Destinations"}
            </h2>
            <p className="section-subtitle">Prices dynamically adjusted based on real-time demand.</p>
          </div>
          
          <div className="filter-controls" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="filter-tabs">
              {categories.map(category => (
                <button 
                  key={category}
                  className={`tab ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <select 
              className="sort-select" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-main)',
                cursor: 'pointer'
              }}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        <div className="hotel-grid">
          {processedHotels.length > 0 ? (
            processedHotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))
          ) : (
            <div className="no-results" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0' }}>
              <h3>No hotels found.</h3>
              <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotelList;
