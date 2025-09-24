import React from 'react';

export default function trackorder({ order, deliveryLocation, setOrder, setDeliveryLocation, setCurrentPage }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Track Your Order</h2>

      {order && (
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Order ID: <span className="font-semibold break-all">{order.id}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Status: <span className="font-semibold text-blue-500">{order.status || 'Pending'}</span>
          </p>
        </div>
      )}

      {deliveryLocation ? (
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Delivery Partner Location</h3>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl space-y-2">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Lat: <span className="font-semibold">{deliveryLocation.latitude.toFixed(4)}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Lon: <span className="font-semibold">{deliveryLocation.longitude.toFixed(4)}</span>
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={() => {
                setOrder(null);
                setDeliveryLocation(null);
                setCurrentPage('profile');
              }}
              className="w-full bg-blue-600 text-white py-2 text-lg font-semibold rounded-xl hover:bg-blue-700 transition duration-300"
            >
              Back to Profile
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 text-lg mt-4">
          Searching for a delivery partner...
        </p>
      )}
    </div>
  );
}