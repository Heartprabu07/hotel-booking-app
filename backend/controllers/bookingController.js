const Booking = require('../models/bookingModel');
const Hotel = require('../models/hotelModel');
const mongoose = require('mongoose');  // Import mongoose

// Book a room
exports.bookRoom = async (req, res) => {
  try {
    const { hotelId, userId, checkInDate, checkOutDate, numOfRooms } = req.body;
    
    // Check if the hotelId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ error: 'Invalid hotel ID' });
    }
    // Check if enough rooms are available
    const hotel = await Hotel.findById(hotelId);
    if (!hotel || hotel.availableRooms < numOfRooms) {
      return res.status(400).json({ error: 'Not enough rooms available' });
    }

    // Calculate the total amount
    // const totalAmount = hotel.pricePerNight * numOfRooms * (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 3600 * 24);
    const totalAmount = hotel.pricePerNight * numOfRooms;

    // Create booking
    // const booking = new Booking({
    //   hotelId,
    //   userId,
    //   checkInDate,
    //   checkOutDate,
    //   numOfRooms,
    //   totalAmount,
    // });

    const booking = new Booking({
      hotelId,
      userId,
      checkInDate,
      checkOutDate,
      numOfRooms,
      totalAmount,
      status: 'Booked'
    });



    await booking.save();
    
    // Update available rooms in hotel
    hotel.availableRooms -= numOfRooms;
    await hotel.save();
    res.status(201).json({ message: 'Booking successful', booking });

    // res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking details
exports.updateBooking = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, numOfRooms } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    console.log('booking ',booking)

    const hotel = await Hotel.findById(booking.hotelId);

    // Check if enough rooms are available
    if (hotel.availableRooms < numOfRooms) {
      return res.status(400).json({ message: 'Not enough rooms available.' });
    }

    // Update booking and available rooms in hotel
    booking.checkInDate = checkInDate;
    booking.checkOutDate = checkOutDate;
    booking.numOfRooms = numOfRooms;

    await booking.save();

    hotel.availableRooms -= numOfRooms;
    await hotel.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get booking by User ID
exports.bookingGetUserId = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate('hotelId', 'name');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// getall booking
exports.getBookedID = async (req, res) => {
  try {
    const bookings = await Booking.findById(req.params.id).populate('hotelId', 'name');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// getall booking
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('hotelId'); // Populate hotel details
    console.log('bookings ',bookings)
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    const hotel = await Hotel.findById(booking.hotelId);

    // Update hotel available rooms
    hotel.availableRooms += booking.numOfRooms;
    await hotel.save();

    // Mark booking as cancelled
    booking.status = 'Cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
