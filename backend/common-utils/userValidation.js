const axios = require('axios');
require('dotenv').config();

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

async function validateUser(userId, role) {
    try {
        const response = await axios.get(`${USER_SERVICE_URL}/user/${userId}`);
        const user = response.data;

        if (!user || user.role !== role) {
            throw new Error(`User validation failed: Expected role '${role}', got '${user?.role || 'none'}'`);
        }

        return user;
    } catch (err) {
        console.error(`Error validating user: ${err.message}`);
        throw new Error('User validation failed');
    }
}

module.exports = { validateUser };
