// backend/models/bookingModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hotelId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Hotel', 
    required: true 
  },
  userId: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  numOfRooms: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Booked' },
});

module.exports = mongoose.model('Booking', bookingSchema);
