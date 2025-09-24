// 1. Necessary libraries-a import panrom.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app FIRST
const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middleware-a use panrom. Idhu request-a process panna udhavum.
app.use(cors());
app.use(express.json());

// 3. Import the new route files
const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');

// 4. Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://indhu:indhu%402006@cluster0.ff07hpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

  mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB is live and connected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});
// 5. API routes-a use panrom.
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);

// 6. Test route (optional, but good for checking if server is up)
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Backend server is up and running!' });
});

// 7. Server-a start panrom.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});