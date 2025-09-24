import React from 'react';

export default function OrderForm({ fuelType, fuelQuantity, setFuelType, setFuelQuantity, getGeolocation, userLocation, isLocating, placeOrder, error }) {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Place a New Order</h3>
      <div>
        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Fuel Type:</label>
        <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600">
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity (in Liters):</label>
        <input type="number" value={fuelQuantity} onChange={(e) => setFuelQuantity(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" min="1" required />
      </div>
      <button onClick={getGeolocation}
        className="w-full bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 transition duration-300" disabled={isLocating}>
        {isLocating ? 'Locating...' : 'Get My Current Location'}
      </button>
      {userLocation && (
        <p className="text-gray-700 dark:text-gray-300 text-center">
          Location Confirmed: Lat {userLocation.latitude.toFixed(4)}, Lon {userLocation.longitude.toFixed(4)}
        </p>
      )}
      <button onClick={placeOrder}
        className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition duration-300" disabled={!userLocation}>
        Place Order
      </button>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}