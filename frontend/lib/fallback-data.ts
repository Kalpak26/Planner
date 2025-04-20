// Fallback data to use when API requests fail

export const fallbackDestinations = [
    {
      id: 1,
      name: "Paris",
      country: "France",
      continent: "europe",
      image: "/frontend/public/images/destinations/Paris.png?height=600&width=800",
      description: "The City of Light with iconic landmarks and world-class cuisine",
      priceStarting: 899,
      badge: "Popular",
    },
    {
      id: 2,
      name: "Rome",
      country: "Italy",
      continent: "europe",
      image: "/frontend/public/images/destinations/Italy.png?height=600&width=800",
      description: "Ancient ruins, Renaissance art, and delicious Italian food",
      priceStarting: 799,
      badge: "Historic",
    },
    {
      id: 3,
      name: "Tokyo",
      country: "Japan",
      continent: "asia",
      image: "/frontend/public/images/destinations/tokoyo.jpg?height=600&width=800",
      description: "Ultra-modern meets traditional in this dynamic metropolis",
      priceStarting: 1199,
      badge: "Trending",
    },
    // Add more fallback destinations covering all continents
  ];
  
  export const fallbackFlights = [
    {
      id: 1,
      airline: "Air France",
      airlineLogoUrl: "/images/flights/AirFrance.png?height=40&width=40",
      departureTime: "08:45",
      departureAirport: "JFK",
      arrivalTime: "21:30",
      arrivalAirport: "CDG",
      duration: "7h 45m",
      stops: 0,
      price: 64999,
      deal: "Best Deal",
    },
    // Add more fallback flights
  ];