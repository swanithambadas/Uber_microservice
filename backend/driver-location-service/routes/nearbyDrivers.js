const express = require("express");
const redisClient = require("../../common-utils/redisClient");
const geolib = require("geolib"); // Install with: npm install geolib
const router = express.Router();

router.post("/nearby-drivers", async (req, res) => {
  const { latitude, longitude, radius } = req.body;

  // Validate input
  if (!latitude || !longitude || !radius) {
    return res
      .status(400)
      .json({
        error:
          "Missing required fields: latitude, longitude, and radius are required",
      });
  }

  try {
    // Fetch all drivers from Redis
    const driverKeys = await redisClient.keys("driver:*");
    const nearbyDrivers = [];

    for (const key of driverKeys) {
      // Retrieve driver location from Redis
      const driverData = await redisClient.hGetAll(key);

      const driverLatitude = parseFloat(driverData.latitude);
      const driverLongitude = parseFloat(driverData.longitude);

      // Calculate the distance between the requested location and the driver's location
      const distance =
        geolib.getDistance(
          { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
          { latitude: driverLatitude, longitude: driverLongitude }
        ) / 1000; // Convert distance from meters to kilometers

      // Check if the driver is within the specified radius
      if (distance <= parseFloat(radius)) {
        nearbyDrivers.push({
          driverId: key.split(":")[1], // Extract driverId from the Redis key
          latitude: driverLatitude,
          longitude: driverLongitude,
          distance,
        });
      }
    }

    res.status(200).json({ drivers: nearbyDrivers });
  } catch (err) {
    console.error(`Error fetching nearby drivers: ${err.message}`);
    res.status(500).json({ error: "Failed to fetch nearby drivers" });
  }
});

module.exports = router;
