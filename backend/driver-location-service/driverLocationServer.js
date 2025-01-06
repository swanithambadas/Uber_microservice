require('dotenv').config();
const express = require('express');
const updateLocationRouter = require('./routes/updateLocation');
const nearbyDriversRouter = require('./routes/nearbyDrivers');
const redisClient = require('../common-utils/redisClient');
console.log('Redis Client:', redisClient);

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Routes
app.use('/driver-location-service', updateLocationRouter);
app.use('/driver-location-service', nearbyDriversRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Driver Location Service running on port ${PORT}`);
});
