const express = require('express');
const Ride = require('../utils/dbRide');
const { validateUser } = require('../../common-utils/userValidation');
const router = express.Router();

router.post('/request-ride', async (req, res) => {
    const { riderId, pickupLocation, dropoffLocation } = req.body;

    if (!riderId || !pickupLocation || !dropoffLocation) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Validate rider
        await validateUser(riderId, 'rider');

        // Create new ride
        const ride = new Ride({
            riderId,
            pickupLocation,
            dropoffLocation,
        });

        const savedRide = await ride.save();
        res.status(201).json({
            message: 'Ride requested successfully',
            ride: savedRide,
        });
    } catch (err) {
        console.error(`Error requesting ride: ${err.message}`);
        res.status(500).json({ error: 'Failed to request ride' });
    }
});

module.exports = router;
