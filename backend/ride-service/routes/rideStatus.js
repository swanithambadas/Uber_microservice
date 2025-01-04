const express = require('express');
const Ride = require('../utils/dbRide');
const router = express.Router();

router.post('/ride-status', async (req, res) => {
    const { rideId } = req.body;

    // Validate input
    if (!rideId) {
        return res.status(400).json({ error: 'Missing rideId in the request body' });
    }

    try {
        const ride = await Ride.findById(rideId);

        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }

        res.status(200).json({ ride });
    } catch (err) {
        console.error(`Error fetching ride status: ${err.message}`);
        res.status(500).json({ error: 'Failed to fetch ride status' });
    }
});

module.exports = router;
