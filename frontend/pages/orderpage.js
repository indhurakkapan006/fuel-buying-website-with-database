import React from 'react';
import OrderForm from '../components/orderform';

export default function ProfilePage({ user, message, fuelType, fuelQuantity, setFuelType, setFuelQuantity, getGeolocation, userLocation, isLocating, placeOrder, error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">User Profile</h2>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        <div className="space-y-6">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
            <p className="text-gray-700 dark:text-gray-300">Name: <span className="font-semibold">{user?.name || 'N/A'}</span></p>
            <p className="text-gray-700 dark:text-gray-300">Email: <span className="font-semibold">{user?.email || 'N/A'}</span></p>
          </div>
          <OrderForm
            fuelType={fuelType}
            fuelQuantity={fuelQuantity}
            setFuelType={setFuelType}
            setFuelQuantity={setFuelQuantity}
            getGeolocation={getGeolocation}
            userLocation={userLocation}
            isLocating={isLocating}
            placeOrder={placeOrder}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}