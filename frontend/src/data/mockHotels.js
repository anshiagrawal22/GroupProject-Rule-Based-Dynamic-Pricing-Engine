export const calculatePrice = (basePrice, factors) => {
  const { season, checkin_day, tourist_level } = factors;
  let price = basePrice;
  const breakdown = [{ rule: 'Base Price', value: price, change: '—' }];

  if (season === 'peak') {
    price *= 1.25;
    breakdown.push({ rule: 'Peak Season', value: Math.round(price), change: '+25%' });
  } else if (season === 'off') {
    price *= 0.80;
    breakdown.push({ rule: 'Off Season', value: Math.round(price), change: '-20%' });
  }

  if (checkin_day === 'weekend') {
    price *= 1.10;
    breakdown.push({ rule: 'Weekend', value: Math.round(price), change: '+10%' });
  }

  if (tourist_level === 'high') {
    price *= 1.20;
    breakdown.push({ rule: 'High Tourist Demand', value: Math.round(price), change: '+20%' });
  } else if (tourist_level === 'low') {
    price *= 0.90;
    breakdown.push({ rule: 'Low Tourist Demand', value: Math.round(price), change: '-10%' });
  }

  const maxPrice = basePrice * 1.50;
  const minPrice = basePrice * 0.70;
  
  let final = Math.min(maxPrice, Math.max(minPrice, price));
  final = Math.round(final);

  if (final !== Math.round(price)) {
    breakdown.push({ rule: 'Fairness Cap Applied', value: final, change: 'Capped' });
  }

  return { finalPrice: final, breakdown };
};

const generateHotels = () => {
  const locations = [
    { city: 'Dehradun', cat: 'Mountains' },
    { city: 'Chandigarh', cat: 'City' },
    { city: 'Delhi', cat: 'City' },
    { city: 'Rishikesh', cat: 'Mountains' }
  ];
  
  const hotelNames = {
    'Dehradun': ['Doon Valley Resort', 'Himalayan Retreat', 'Pines Forest Hotel', 'Forest Avenue', 'Mountain View Inn', 'Doon Serenity'],
    'Chandigarh': ['The Grand Chandigarh', 'City Center Hotel', 'Plaza Boutique', 'Urban Oasis Chandigarh', 'Lakeside Stay', 'Modern Comfort Inn'],
    'Delhi': ['Capital Residency', 'Delhi Heritage Lodge', 'Metro View Hotel', 'The Royal Palace', 'Connaught Stay', 'New Delhi Inn'],
    'Rishikesh': ['Ganges View Resort', 'Yoga Retreat Center', 'Rishikesh Valley Hotel', 'Riverfront Resort', 'Himalayan Breeze', 'Divine Stay']
  };

  const images = [
    'https://images.unsplash.com/photo-1542314831-c53cd4b85d6a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=800&auto=format&fit=crop'
  ];

  const hotels = [];
  let idCounter = 1;

  locations.forEach(loc => {
    for (let i = 0; i < 6; i++) {
      hotels.push({
        id: `h${idCounter}`,
        name: hotelNames[loc.city][i],
        location: loc.city,
        category: loc.cat,
        rating: (Math.random() * (5 - 4) + 4).toFixed(1),
        reviews: Math.floor(Math.random() * 1000) + 100,
        image: images[i],
        amenities: ['Free WiFi', 'AC', 'Breakfast', 'Pool', 'Gym'].slice(0, 2 + Math.floor(Math.random() * 3)),
        pricing: {
          basePrice: Math.floor(Math.random() * 60) * 100 + 4000,
          currency: '₹',
          dynamicFactors: {
            season: Math.random() > 0.5 ? 'peak' : (Math.random() > 0.5 ? 'normal' : 'off'),
            checkin_day: Math.random() > 0.7 ? 'weekend' : 'weekday',
            tourist_level: Math.random() > 0.6 ? 'high' : (Math.random() > 0.5 ? 'medium' : 'low')
          }
        }
      });
      idCounter++;
    }
  });

  return hotels;
};

export const mockHotels = generateHotels();
