const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Render a simple home page or use a template engine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the frontend server
app.listen(port, () => {
    console.log(`Frontend server running on http://localhost:${port}`);
});
