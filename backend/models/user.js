const mongoose = require('mongoose');

// User Schema define panrom. Idhu dhan database-oda blueprint.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true, // Phone number unique-ah irukkanum
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email unique-ah irukkanum
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Timestamps automatically createdAt and updatedAt-a add pannum.

const User = mongoose.model('User', userSchema);
module.exports = User;
