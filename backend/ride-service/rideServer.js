require('dotenv').config(); // Load environment variable
const express = require('express');
const mongoose = require('mongoose');

// Import routers
const requestRideRouter = require('./routes/requestRide');
const acceptRideRouter = require('./routes/acceptRide');
const rideStatusRouter = require('./routes/rideStatus');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// MongoDB Connection
(async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit the process if the connection fails
    }
})();

// Use routers for different endpoints
app.use('/ride', requestRideRouter);
app.use('/ride', acceptRideRouter);
app.use('/ride', rideStatusRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Ride Management Service running on port ${PORT}`);
});
