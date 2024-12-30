const express = require('express');
const router = express.Router();
const pool = require('./db');
const authenticateToken = require('./authenticateToken'); // Middleware to authenticate JWT

// Get Profile API
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        // Step 1: Extract user ID from the authenticated token
        const userId = req.user.id;

        // Step 2: Query the database for user details
        const result = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Step 3: Respond with the user profile
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
