import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HotelList from './components/HotelList';
import HotelDetail from './components/HotelDetail';
import BookingConfirmation from './components/BookingConfirmation';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [searchLocation, setSearchLocation] = useState('');

  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection onSearch={setSearchLocation} />
            <HotelList searchLocation={searchLocation} />
          </>
        } />
        <Route path="/hotel/:id" element={<HotelDetail />} />
        <Route path="/reserve/:id" element={<BookingConfirmation />} />
        <Route path="*" element={
          <div style={{ padding: '100px 0', textAlign: 'center', color: 'white' }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
            <h2>Page Not Found</h2>
            <p style={{ margin: '1rem 0 2rem', opacity: 0.7 }}>The page you are looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary" style={{ display: 'inline-block' }}>Back to Home</Link>
          </div>
        } />
      </Routes>
      
      <footer style={{ padding: '3rem 0', textAlign: 'center', backgroundColor: '#1a1b1e', color: '#6b7280', borderTop: '1px solid #2d2e32' }}>
        <div className="container">
          <p>© 2026 Voya Dynamic Pricing Engine Demo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
