const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// Create User model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
