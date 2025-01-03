# Hotel Booking System

## Overview
This is a hotel booking system where users can:
1. View a list of hotels and filter them by location.
2. Book rooms at selected hotels.
3. View their bookings.
4. Modify or cancel existing bookings.

## Backend Setup
1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the server: `npm start` or `node server.js`
4. The backend will be hosted at `http://localhost:3000`.

## Frontend Setup
1. The frontend is served from the `/frontend` folder.
2. Open `index.html` in your browser to view the application.

## API Endpoints
- `GET /api/hotels`: Get all hotels.
- `POST /api/book`: Create a new booking.
- `GET /api/book/{userId}`: Get all bookings for a specific user.
- `GET /api/booking/{id}`: Get specific book.
- `PUT /api/book/{id}`: Modify booking details.
- `DELETE /api/book/{bookingId}`: Cancel a booking.

## Notes
- The system uses hardcoded user details for now.
- Please ensure MongoDB is running and the necessary collections are created.