const express = require('express');
const Ride = require('../utils/dbRide');
const { validateUser } = require('../../common-utils/userValidation');
const router = express.Router();

router.post('/accept-ride', async (req, res) => {
    const { rideId, driverId } = req.body;

    if (!rideId || !driverId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Validate driver
        await validateUser(driverId, 'driver');

        // Update ride status
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }

        if (ride.status !== 'requested') {
            return res.status(400).json({ error: `Ride cannot be accepted, current status: ${ride.status}` });
        }

        const updatedRide = await Ride.findByIdAndUpdate(
            rideId,
            { driverId, status: 'accepted' },
            { new: true }
        );

        if (!updatedRide) {
            return res.status(404).json({ error: 'Ride not found' });
        }

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
