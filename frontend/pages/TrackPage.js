import React from 'react';
import TrackOrder from '../components/TrackOrder';

export default function TrackPage({ order, deliveryLocation, setOrder, setDeliveryLocation, setCurrentPage }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 to-red-500 p-4">
      <TrackOrder
        order={order}
        deliveryLocation={deliveryLocation}
        setOrder={setOrder}
        setDeliveryLocation={setDeliveryLocation}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}