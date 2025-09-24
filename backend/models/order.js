const mongoose = require('mongoose');

// Order Schema define panrom.
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User model-a reference pannum
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['Petrol', 'Diesel'], // Itha rendu option-a mattum accept pannum
  },
  fuelQuantity: {
    type: Number,
    required: true,
    min: 1, // Minimum 1 liter
  },
  userLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  status: {
    type: String,
    default: 'Placed',
    enum: ['Placed', 'Accepted', 'On the way', 'Delivered', 'Cancelled'],
  },
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  deliveryLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
