// Base API configuration
const API_URL = 'http://localhost:8080/api';

// Helper function for handling responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    } catch (e) {
      throw new Error(`API error: ${response.status}`);
    }
  }

  if (response.status !== 204) {
    return response.json();
  }

  return null;
}

// Fallback data
import { fallbackDestinations } from './fallback-data';

// Auth service
export const authService = {
  async login(username: string, password: string) {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await handleResponse(response);
    if (data && data.token) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  },

  async register(userData: any) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    return handleResponse(response);
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  },

  getToken() {
    const user = this.getCurrentUser();
    return user?.token;
  }
};

// Helper function to create authenticated request headers
function authHeader(): Record<string, string> {
  const token = authService.getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Destinations service with fallback
export const destinationService = {
  async getAll() {
    try {
      const response = await fetch(`${API_URL}/destinations`);
      return handleResponse(response);
    } catch (error) {
      console.error("Failed to fetch destinations, using fallback data", error);
      return fallbackDestinations;
    }
  },

  async getById(id: number) {
    try {
      const response = await fetch(`${API_URL}/destinations/${id}`);
      return handleResponse(response);
    } catch (error) {
      console.error(`Failed to fetch destination ${id}, using fallback data`, error);
      return fallbackDestinations.find(d => d.id === id) || fallbackDestinations[0];
    }
  },

  async getByContinent(continent: string) {
    try {
      const response = await fetch(`${API_URL}/destinations/continent/${continent}`);
      return handleResponse(response);
    } catch (error) {
      console.error(`Failed to fetch destinations for ${continent}, using fallback data`, error);
      return fallbackDestinations.filter(d => d.continent === continent);
    }
  },

  async search(query: string) {
    try {
      const response = await fetch(`${API_URL}/destinations/search?query=${query}`);
      return handleResponse(response);
    } catch (error) {
      console.error(`Failed to search destinations for "${query}", using fallback data`, error);
      return fallbackDestinations.filter(d =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
};

// Flights service
export const flightService = {
  async search(searchData: any) {
    const response = await fetch(`${API_URL}/flights/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify(searchData)
    });

    return handleResponse(response);
  },

  async getById(id: number) {
    const response = await fetch(`${API_URL}/flights/${id}`, {
      headers: authHeader()
    });

    return handleResponse(response);
  }
};

// Booking service
export const bookingService = {
  async createBooking(bookingData: any) {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify(bookingData)
    });

    return handleResponse(response);
  },

  async getMyBookings() {
    const response = await fetch(`${API_URL}/bookings/my-bookings`, {
      headers: authHeader()
    });

    return handleResponse(response);
  }
};

// Trip service
export const tripService = {
  async createTrip(tripData: any) {
    const response = await fetch(`${API_URL}/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify(tripData)
    });

    return handleResponse(response);
  },

  async getMyTrips() {
    const response = await fetch(`${API_URL}/trips/my-trips`, {
      headers: authHeader()
    });

    return handleResponse(response);
  },

  async getTripById(id: number) {
    const response = await fetch(`${API_URL}/trips/${id}`, {
      headers: authHeader()
    });

    return handleResponse(response);
  }
};

// User service
export const userService = {
  async getProfile() {
    const response = await fetch(`${API_URL}/user/profile`, {
      headers: authHeader()
    });

    return handleResponse(response);
  },

  async updateProfile(userData: any) {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify(userData)
    });

    return handleResponse(response);
  }
};
