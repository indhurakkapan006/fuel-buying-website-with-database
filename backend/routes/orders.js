const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Place a new order
router.post('/place', async (req, res) => {
  try {
    const { userId, fuelType, fuelQuantity, userLocation } = req.body;
    const newOrder = new Order({
      userId,
      fuelType,
      fuelQuantity,
      userLocation,
      status: 'pending',
    });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: 'Error placing order', error: err.message });
  }
});

// Get a single order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order', error: err.message });
  }
});

// Get a user's orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user orders', error: err.message });
  }
});

module.exports = router;