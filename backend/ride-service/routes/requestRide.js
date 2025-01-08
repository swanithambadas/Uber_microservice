const express = require('express');
const Ride = require('../utils/dbRide');
const { validateUser } = require('../../common-utils/userValidation');
const axios = require('axios'); // For calling the Driver Location Service
const router = express.Router();

const DRIVER_LOCATION_SERVICE_URL = process.env.DRIVER_LOCATION_SERVICE_URL;

router.post('/request-ride', async (req, res) => {
    const { riderId, pickupLocation, dropoffLocation } = req.body;

    if (!riderId || !pickupLocation || !dropoffLocation) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Validate rider
        await validateUser(riderId, 'rider');

        // Fetch nearby drivers from Driver Location Service
        const nearbyDriversResponse = await axios.post(
            `${DRIVER_LOCATION_SERVICE_URL}/driver-location-service/nearby-drivers`,
            {
                latitude: pickupLocation.latitude,
                longitude: pickupLocation.longitude,
                radius: 5000, // Example: 5km radius
            }
        );
        

        const nearbyDrivers = nearbyDriversResponse.data.drivers.map((driver) => ({
            member: driver.driverId,
            coordinates: {
                latitude: driver.latitude,
                longitude: driver.longitude,
            },
        }));

        // Create new ride with nearby drivers
        const ride = new Ride({
            riderId,
            pickupLocation,
            dropoffLocation,
            nearbyDrivers, // Save the nearby drivers
        });

        const savedRide = await ride.save();

        // Response includes the nearby drivers
        res.status(201).json({
            message: 'Ride requested successfully',
            ride: savedRide,
            nearbyDrivers: nearbyDrivers.length > 0 ? nearbyDrivers : 'No drivers nearby. Waiting for drivers to approach.',
        });
    } catch (err) {
        console.error(`Error requesting ride: ${err.message}`);
        res.status(500).json({ error: 'Failed to request ride' });
    }
});

module.exports = router;
