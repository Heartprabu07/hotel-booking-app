const Hotel = require('../models/hotelModel');

// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find(); // Fetch all hotels from MongoDB
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching hotels from database' });
  }
};

// Get hotels by location
exports.getHotelsByLocation = async (req, res) => {
  try {
    const { location } = req.query;
    const hotels = await Hotel.find({ location: new RegExp(location, 'i') }); // Case-insensitive search
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching hotels by location' });
  }
};
