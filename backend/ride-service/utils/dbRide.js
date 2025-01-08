const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
  riderId: { type: String, required: true },
  driverId: { type: String, default: null },
  driverLocation: {
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
  },
  pickupLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  dropoffLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  nearbyDrivers: [
    {
      member: { type: String, required: true },
      coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
    },
  ],
  status: {
    type: String,
    enum: ["requested", "accepted", "completed"],
    default: "requested",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ride", RideSchema);
