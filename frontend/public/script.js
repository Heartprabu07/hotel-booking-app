const locationInput = document.getElementById('location');
const filterBtn = document.getElementById('filter-btn');
const bookedBtn = document.getElementById('booked-btn');
const hotelList = document.getElementById('hotel-list');
const bookingModal = document.getElementById('booking-modal');
const closeModal = document.getElementById('close-modal');
const bookingForm = document.getElementById('booking-form');
const hotelIdInput = document.getElementById('hotel-id');
const roomsInput = document.getElementById('rooms');
const checkInInput = document.getElementById('check-in');
const checkOutInput = document.getElementById('check-out');

// Function to fetch hotels from the backend
async function fetchHotels(location = '') {
    try {
        const response = await fetch(`http://localhost:3000/api/hotels?location=${location}`);
        const hotels = await response.json();
        const imageUrl = `images/grand-hotel-logo.jpg`;  // Local path
        hotelList.innerHTML = '';
        hotels.forEach(hotel => {
            const hotelCard = document.createElement('div');
            hotelCard.classList.add('hotel-card');
            hotelCard.innerHTML = `
                <img src="${imageUrl}" alt="${hotel.name}" class="hotel-image">
                <h3>${hotel.name}</h3>
                <p>${hotel.location}</p>
                <p>Rs.${hotel.pricePerNight}/night</p>
                <button onclick="openBookingModal('${hotel._id}')">Book Now</button>
            `;
            hotelList.appendChild(hotelCard);
        });
    } catch (error) {
        console.error('Error fetching hotels:', error);
    }
}

function openBookingModal(hotelId) {
    hotelIdInput.value = hotelId;
    bookingModal.style.display = 'flex';
}

// Close booking modal
closeModal.addEventListener('click', () => {
    bookingModal.style.display = 'none';
});

// Handle booking form submission
bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const hotelId = hotelIdInput.value;
    const rooms = roomsInput.value;
    const checkInDate = checkInInput.value;
    const checkOutDate = checkOutInput.value;
    const userId = "12345";  // Hardcoded for the logged-in user

    const bookingData = {
        hotelId,
        userId,
        numOfRooms: rooms,
        checkInDate,
        checkOutDate,
    };

    try {
        const response = await fetch('http://localhost:3000/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        const booking = await response.json();
        alert('Booking successful!');
        bookingModal.style.display = 'none';
        fetchBookings(); // Reload the bookings after booking
    } catch (error) {
        console.error('Error making booking:', error);
    }
});

// Filter hotels based on location
filterBtn.addEventListener('click', () => {
    const location = locationInput.value;
    console.log('location ',location)
    fetchHotels(location);
});



bookedBtn.addEventListener('click', () => {
    fetchBookings();
});


// Fetch bookings for the logged-in user
async function fetchBookings() {
    const userId = "12345"; // Hardcoded for the logged-in user
    const response = await fetch(`http://localhost:3000/api/book/${userId}`);
    const bookings = await response.json();
  
    const bookingsBody = document.getElementById('bookingsBody');
    bookingsBody.innerHTML = ''; // Clear existing bookings
  
    bookings.forEach(booking => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${booking.hotelId.name}</td>
        <td>${booking.checkInDate}</td>
        <td>${booking.checkOutDate}</td>
        <td>${booking.numOfRooms}</td>
        <td>${booking.status}</td>
        <td>
          <button onclick="modifyBooking('${booking._id}')">Modify</button>
          <button onclick="cancelBooking('${booking._id}')">Cancel</button>
        </td>
      `;
      bookingsBody.appendChild(row);
    });
  }

  async function getBookingById(bookingId) {
    const response = await fetch(`http://localhost:3000/api/booking/${bookingId}`);
    const data = await response.json();
    
    if (data.error) {
      alert(data.error); // Show error message if booking is not found
      return null;
    }
    
    return data; // Return booking details
  }


// Modify booking
async function modifyBooking(bookingId) {
    const modal = document.getElementById("modifyBookingModal");
    modal.style.display = "flex";
  
    // Fetch the booking details by bookingId (simulated here)
    const booking = await getBookingById(bookingId); // Implement this function to get booking data
    
    // Pre-fill the current booking details (check-in and check-out dates)
    document.getElementById("checkInDate").value = formatDate(booking.checkInDate);
    document.getElementById("checkOutDate").value = formatDate(booking.checkOutDate);
    document.getElementById("numOfRooms").value = booking.numOfRooms;

    // Set up form submission
    document.getElementById("modifyBookingForm").onsubmit = async function (e) {
      e.preventDefault(); // Prevent the form from submitting normally
      const newCheckInDate = document.getElementById("checkInDate").value;
      const newCheckOutDate = document.getElementById("checkOutDate").value;
    const numOfRooms = document.getElementById("numOfRooms").value;
      // Make the PUT request to update the booking
      const response = await fetch(`http://localhost:3000/api/book/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkInDate: newCheckInDate, checkOutDate: newCheckOutDate,numOfRooms:numOfRooms }),
      });
      const result = await response.json();
      alert('Booking Updated successful!');
      // Close the modal and reload bookings after modification
      closeModal();
      fetchBookings();
    };
  }
  
// Function to format the date into 'YYYY-MM-DD' format
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  // Cancel booking
  async function cancelBooking(bookingId) {
    const response = await fetch(`http://localhost:3000/api/book/${bookingId}`, {
      method: 'DELETE',
    });
  
    const result = await response.json();
    alert(result.message);
    fetchBookings();  // Reload the bookings after cancellation
  }



// Initial fetch for all hotels
fetchHotels();
