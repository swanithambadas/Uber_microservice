const express = require("express");
const redisClient = require("../../common-utils/redisClient");
const { validateUser } = require("../../common-utils/userValidation");
const router = express.Router();

router.post("/update-location", async (req, res) => {
  const { driverId, latitude, longitude } = req.body;

  // Validate input
  if (!driverId || latitude === undefined || longitude === undefined) {
    console.log("Invalid input:", { driverId, latitude, longitude });
    return res
      .status(400)
      .json({
        error:
          "Missing required fields: driverId, latitude, and longitude are required",
      });
  }

  try {
    // Validate driver using User Service
    await validateUser(driverId, "driver");

    console.log("Saving to Redis:", { driverId, latitude, longitude });

    // Debug with explicit Redis command
    await redisClient.hSet(
      `driver:${driverId}`,
      "latitude",
      latitude.toString()
    );
    await redisClient.hSet(
      `driver:${driverId}`,
      "longitude",
      longitude.toString()
    );

    console.log(`Driver location saved: driver:${driverId}`);
    res.status(200).json({ message: "Driver location updated successfully" });
  } catch (err) {
    console.error(`Error updating driver location: ${err.message}`);
    res.status(500).json({ error: "Failed to update driver location" });
  }
});

module.exports = router;
