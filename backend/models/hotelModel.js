// backend/models/hotelModel.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  availableRooms: Number,
  pricePerNight: Number
});

module.exports = mongoose.model('Hotel', hotelSchema);
