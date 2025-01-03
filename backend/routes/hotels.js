const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

router.get('/hotels', hotelController.getAllHotels);

module.exports = router;
