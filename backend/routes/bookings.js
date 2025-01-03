const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/book', bookingController.bookRoom);
router.get('/book/:userId', bookingController.bookingGetUserId);
router.get('/booking/:id', bookingController.getBookedID);
router.put('/book/:id', bookingController.updateBooking);
router.get('/bookings', bookingController.getAllBookings);
router.delete('/book/:bookingId', bookingController.cancelBooking);

module.exports = router;
