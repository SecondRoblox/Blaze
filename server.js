const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store for profiles (you can replace this with a database)
const profiles = {};

// Handle Socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for incoming messages
    socket.on('message', (data) => {
        const { username, message } = data;
        // Broadcast the message to all connected clients
        io.emit('message', { username, message });
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Endpoint to set a user profile
app.post('/set-profile', express.json(), (req, res) => {
    const { username, pictureUrl, description } = req.body;
    profiles[username] = { pictureUrl, description };
    res.sendStatus(200);
});

// Endpoint to get a user profile
app.get('/get-profile', (req, res) => {
    const { username } = req.query;
    if (profiles[username]) {
        res.json(profiles[username]);
    } else {
        res.json({ pictureUrl: 'default-profile.jpg', description: 'No description provided.' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
