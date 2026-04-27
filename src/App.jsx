import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
      </Routes>
      
      <footer style={{ padding: '3rem 0', textAlign: 'center', backgroundColor: '#1a1b1e', color: '#6b7280' }}>
        <div className="container">
          <p>© 2026 Voya Dynamic Pricing Engine Demo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
