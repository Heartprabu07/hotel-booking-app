const mongoose = require('mongoose');

// MongoDB URI - Replace this with your own MongoDB URI or use a local instance
const mongoURI = 'mongodb://localhost:27017/hotel_booking_app'; // Example for local MongoDB

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

module.exports = mongoose;
