const express = require('express');
const Ride = require('../utils/dbRide');
const { validateUser } = require('../../common-utils/userValidation');
const redisClient = require('../../common-utils/redisClient');
const geolib = require('geolib'); // For distance calculations
const router = express.Router();

router.post('/accept-ride', async (req, res) => {
    const { rideId, driverId } = req.body;

    if (!rideId || !driverId) {
        return res.status(400).json({ error: 'Missing required fields: rideId and driverId are required' });
    }

    try {
        // Step 1: Validate the driver role
        await validateUser(driverId, 'driver');

        // Step 2: Fetch the ride document
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }

        // Step 3: Validate the ride's current status
        if (ride.status !== 'requested') {
            return res.status(400).json({ error: `Ride cannot be accepted, current status: ${ride.status}` });
        }

        // Step 4: Check if the driver is in the nearbyDrivers list
        const isDriverNearby = ride.nearbyDrivers.some((driver) => driver.member === driverId);
        if (!isDriverNearby) {
            return res.status(400).json({ error: 'Driver is not in the list of nearby drivers' });
        }

        // Step 5: Fetch driver's current location from Redis
        const driverLocationData = await redisClient.hGetAll(`driver:${driverId}`);
        if (!driverLocationData.latitude || !driverLocationData.longitude) {
            return res.status(400).json({ error: 'Unable to fetch driver location' });
        }

        const driverCurrentLocation = {
            latitude: parseFloat(driverLocationData.latitude),
            longitude: parseFloat(driverLocationData.longitude),
        };

        // Step 6: Validate if the driver is still within the allowed radius
        const distance = geolib.getDistance(
            { latitude: ride.pickupLocation.latitude, longitude: ride.pickupLocation.longitude },
            driverCurrentLocation
        );

        const allowedRadius = 5000; // 5km radius
        if (distance > allowedRadius) {
            return res.status(400).json({ error: 'Driver is too far to accept the ride' });
        }

        // Step 7: Update the ride
        const updatedRide = await Ride.findByIdAndUpdate(
            rideId,
            {
                driverId,
                driverLocation: driverCurrentLocation,
                status: 'accepted',
                $unset: { nearbyDrivers: 1 }, // Remove nearbyDrivers field after acceptance
            },
            { new: true } // Return the updated document
        );

        if (!updatedRide) {
            return res.status(500).json({ error: 'Failed to update the ride' });
        }

        // Step 8: Respond with success
        res.status(200).json({
            message: 'Ride accepted successfully',
            ride: updatedRide,
        });
    } catch (err) {
        console.error(`Error accepting ride: ${err.message}`);
        res.status(500).json({ error: 'Failed to accept ride' });
    }
});

module.exports = router;
