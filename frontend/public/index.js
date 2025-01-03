document.addEventListener('DOMContentLoaded', async () => {
    const hotelList = document.getElementById('hotelList');

    // Fetch hotels from the backend API
    const response = await fetch('http://localhost:3000/api/hotels');
    const hotels = await response.json();

    // Display hotels in the list
    hotels.forEach(hotel => {
        const listItem = document.createElement('li');
        listItem.textContent = `${hotel.name} - ${hotel.location}`;
        hotelList.appendChild(listItem);
    });
});
