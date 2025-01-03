
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


// Routes
const hotelRoutes = require('./routes/hotels');
const bookingRoutes = require('./routes/bookings');

// Initialize dotenv
dotenv.config();

app.use(cors({
    origin: 'http://localhost:3001'
  }));
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

// Use routes
app.use('/api', hotelRoutes);
app.use('/api', bookingRoutes);

// // Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
