import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockHotels, calculatePrice } from '../data/mockHotels';
import { ArrowLeft, Star, MapPin, Check, TrendingUp, TrendingDown, Clock, ShieldCheck, Heart } from 'lucide-react';
import './HotelDetail.css';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const foundHotel = mockHotels.find(h => h.id === id);
    setHotel(foundHotel);
  }, [id]);

  if (!hotel) {
    return (
      <div className="hotel-detail-loading">
        <div className="container">
          <h2>Loading or Hotel not found...</h2>
          <button onClick={() => navigate('/')} className="btn btn-outline">Back to Home</button>
        </div>
      </div>
    );
  }

  const { name, location, rating, reviews, image, amenities, pricing, category } = hotel;
  const { basePrice, currency, dynamicFactors } = pricing;
  
  const { finalPrice } = calculatePrice(basePrice, dynamicFactors);
  const currentPrice = finalPrice;

  const isDiscounted = currentPrice < basePrice;
  const isSurged = currentPrice > basePrice;
  const percentDiff = Math.round(Math.abs((currentPrice - basePrice) / basePrice * 100));

  return (
    <div className="hotel-detail-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>

        <div className="hotel-detail-header">
          <div>
            <div className="category-tag">{category}</div>
            <h1 className="hotel-detail-title">{name}</h1>
            <div className="hotel-detail-meta">
              <span className="meta-item"><MapPin size={16} /> {location}</span>
              <span className="meta-item rating">
                <Star size={16} fill="#fbbf24" color="#fbbf24" /> 
                {rating} ({reviews} reviews)
              </span>
            </div>
          </div>
          <button className="btn btn-outline like-btn">
            <Heart size={20} /> Save
          </button>
        </div>

        <div className="hotel-detail-image-grid">
          <div className="main-image">
            <img src={image} alt={name} />
          </div>
          <div className="side-images">
            <img src={`${image}&auto=format&fit=crop&w=400&q=80`} alt={`${name} view 2`} />
            <img src={`${image}&auto=format&fit=crop&w=400&q=80`} alt={`${name} view 3`} />
          </div>
        </div>

        <div className="hotel-detail-content">
          <div className="hotel-detail-main">
            <section className="detail-section">
              <h2>About this place</h2>
              <p>Experience the ultimate getaway at {name}, located in the beautiful {location}. This premium property offers top-notch facilities and a memorable stay for all guests. Enjoy breathtaking views and exceptional service tailored just for you.</p>
            </section>

            <section className="detail-section">
              <h2>Amenities</h2>
              <div className="amenities-grid">
                {amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <Check size={18} className="text-primary" /> {amenity}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="hotel-detail-sidebar">
            <div className="booking-card">
              <div className="booking-card-header">
                <div className="price-display">
                  {isDiscounted || isSurged ? (
                    <span className="old-price">{currency}{basePrice}</span>
                  ) : null}
                  <span className={`new-price ${isDiscounted ? 'text-discount' : isSurged ? 'text-surge' : ''}`}>
                    {currency}{currentPrice}
                  </span>
                  <span className="per-night">/ night</span>
                </div>
                
                <div className="pricing-badges">
                  {isDiscounted && (
                    <span className="badge badge-discount">
                      <TrendingDown size={14} /> {percentDiff}% OFF
                    </span>
                  )}
                  {isSurged && (
                    <span className="badge badge-surge">
                      <TrendingUp size={14} /> High Demand
                    </span>
                  )}
                </div>
              </div>

              <div className="dynamic-pricing-insight">
                <h4>Pricing Insight</h4>
                <ul>
                  <li><Clock size={14}/> <strong>Season:</strong> {dynamicFactors.season}</li>
                  <li><TrendingUp size={14}/> <strong>Demand Level:</strong> {dynamicFactors.tourist_level}</li>
                  <li><ShieldCheck size={14}/> <strong>Check-in Day:</strong> {dynamicFactors.checkin_day}</li>
                </ul>
              </div>

              <div className="booking-dates">
                <div className="date-input">
                  <label>Check-in</label>
                  <input type="date" />
                </div>
                <div className="date-input">
                  <label>Check-out</label>
                  <input type="date" />
                </div>
              </div>
              
              <button 
                className="btn btn-primary btn-block reserve-btn"
                onClick={() => navigate(`/reserve/${id}`)}
              >
                Reserve Now
              </button>
              
              <p className="no-charge-text">You won't be charged yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
