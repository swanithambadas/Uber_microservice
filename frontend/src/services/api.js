import axios from 'axios';

const USER_SERVICE_URL = 'http://localhost:3000';
const RIDE_SERVICE_URL = 'http://localhost:4000';
const DRIVER_LOCATION_SERVICE_URL = 'http://localhost:5000';

// User Service APIs
const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/user/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/user/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Ride Service APIs
const requestRide = async (rideData, token) => {
  try {
    const response = await axios.post(`${RIDE_SERVICE_URL}/ride/request-ride`, rideData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const getRideStatus = async (rideId, token) => {
  try {
    const response = await axios.post(
      `${RIDE_SERVICE_URL}/ride/ride-status`,
      { rideId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Driver Location Service APIs
const updateDriverLocation = async (driverData, token) => {
  try {
    const response = await axios.post(
      `${DRIVER_LOCATION_SERVICE_URL}/driver-location-service/update-location`,
      driverData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const getNearbyDrivers = async (location, radius) => {
  try {
    const response = await axios.post(
      `${DRIVER_LOCATION_SERVICE_URL}/driver-location-service/nearby-drivers`,
      location,
      { params: { radius } }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const api = {
  register: registerUser,
  login: loginUser,
  getUserProfile,
  requestRide,
  getRideStatus,
  updateDriverLocation,
  getNearbyDrivers,
};

// Export both named functions and the `api` object
export {
  registerUser,
  loginUser,
  getUserProfile,
  requestRide,
  getRideStatus,
  updateDriverLocation,
  getNearbyDrivers,
};

export default api;
