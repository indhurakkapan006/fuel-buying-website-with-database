import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null); // Backend-la irundhu varra user data
  const [profile, setProfile] = useState(null);
  const [fuelType, setFuelType] = useState('Petrol');
  const [fuelQuantity, setFuelQuantity] = useState(10);
  const [userLocation, setUserLocation] = useState(null);
  const [order, setOrder] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // Fake auth state. In real app, we would use Firebase or JWT tokens.
  useEffect(() => {
    // This is a simple placeholder. In the real app, we would check for a token
    // or use a real authentication provider like Firebase.
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
      setCurrentPage('profile');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Placeholder for real auth
      setMessage('Login successful! Redirecting...');
      setCurrentPage('profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
        phone,
      });
      setMessage('Sign up successful! Please log in.');
      setCurrentPage('login');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed. User might already exist.');
    }
  };

  const getGeolocation = () => {
    setError('');
    setIsLocating(true);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setIsLocating(false);
        setMessage("Your location has been successfully found.");
      },
      (error) => {
        setError("Could not find location. Please allow permissions.");
        setIsLocating(false);
      }
    );
  };

  const placeOrder = async () => {
    if (!userLocation || !user) {
      setError("Please confirm your location and login before placing an order.");
      return;
    }
    setError('');
    setMessage('');

    try {
      const orderData = {
        userId: user.id,
        fuelType: fuelType,
        fuelQuantity: fuelQuantity,
        userLocation: userLocation,
      };
      const response = await axios.post(`${API_URL}/orders/place`, orderData);
      setOrder({ id: response.data.orderId, ...orderData });
      setMessage('Order placed successfully! Redirecting...');
      setCurrentPage('track');
    } catch (e) {
      setError("Failed to place order.");
    }
  };

  // This is a simulation of delivery partner location. In a real app,
  // we would use a WebSocket or a similar real-time method.
  useEffect(() => {
    if (order && currentPage === 'track') {
      const interval = setInterval(async () => {
        const simulatedLocation = {
          latitude: order.userLocation.latitude + (Math.random() - 0.5) * 0.005,
          longitude: order.userLocation.longitude + (Math.random() - 0.5) * 0.005,
        };
        setDeliveryLocation(simulatedLocation);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [order, currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Login</h2>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              {message && <p className="text-green-500 text-center mb-4">{message}</p>}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
                >
                  Login
                </button>
              </form>
              <div className="mt-6 text-center">
                <button
                  onClick={() => setCurrentPage('signup')}
                  className="text-blue-600 hover:underline"
                >
                  Don't have an account? Sign Up
                </button>
              </div>
            </div>
          </div>
        );
      case 'signup':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Sign Up</h2>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Phone:</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
                >
                  Sign Up
                </button>
              </form>
              <div className="mt-6 text-center">
                <button
                  onClick={() => setCurrentPage('login')}
                  className="text-blue-600 hover:underline"
                >
                  Already have an account? Login
                </button>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">User Profile</h2>
              {message && <p className="text-green-500 text-center mb-4">{message}</p>}
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                  <p className="text-gray-700 dark:text-gray-300">Name: <span className="font-semibold">{user?.name || 'N/A'}</span></p>
                  <p className="text-gray-700 dark:text-gray-300">Email: <span className="font-semibold">{user?.email || 'N/A'}</span></p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Place a New Order</h3>
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Fuel Type:</label>
                    <select
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Quantity (in Liters):</label>
                    <input
                      type="number"
                      value={fuelQuantity}
                      onChange={(e) => setFuelQuantity(e.target.value)}
                      className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      min="1"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <button
                      onClick={getGeolocation}
                      className="w-full bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 transition duration-300"
                      disabled={isLocating}
                    >
                      {isLocating ? 'Locating...' : 'Get My Current Location'}
                    </button>
                    {userLocation && (
                      <p className="text-gray-700 dark:text-gray-300 mt-2 text-center">
                        Location Confirmed: Lat {userLocation.latitude.toFixed(4)}, Lon {userLocation.longitude.toFixed(4)}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={placeOrder}
                    className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition duration-300"
                    disabled={!userLocation}
                  >
                    Place Order
                  </button>
                  {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        );
      case 'track':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Track Your Order</h2>
              {order && (
                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300 text-lg">Order ID: <span className="font-semibold break-all">{order.id}</span></p>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">Status: <span className="font-semibold text-blue-500">{order.status || 'Pending'}</span></p>
                </div>
              )}
              {deliveryLocation ? (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Delivery Partner Location</h3>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                      Lat: <span className="font-semibold">{deliveryLocation.latitude.toFixed(4)}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                      Lon: <span className="font-semibold">{deliveryLocation.longitude.toFixed(4)}</span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        setOrder(null);
                        setDeliveryLocation(null);
                        setCurrentPage('profile');
                      }}
                      className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
                    >
                      Back to Profile
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300">Searching for a delivery partner...</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 font-sans">
      <style>{`
        body { @apply bg-gray-100 dark:bg-gray-900; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .dark ::-webkit-scrollbar-thumb { background: #4a5568; }
        .dark .bg-gray-100 { background-color: #1a202c; }
      `}</style>
      <div className="min-h-screen flex flex-col justify-center items-center">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
