const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    riderId: { type: String, required: true },
    driverId: { type: String, default: null },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    status: { type: String, enum: ['requested', 'accepted', 'completed'], default: 'requested' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ride', RideSchema);
