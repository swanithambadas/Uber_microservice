const express = require('express');
const router = express.Router();
const pool = require('../utils/dbUser');
const authenticateToken = require('../utils/authenticateToken'); // Middleware to authenticate JWT

// Unified Get Profile API
router.get('/:id?', authenticateToken, async (req, res) => {
    try {
        let userId;

        // Handle token-based requests to `/user/profile`
        if (req.params.id === 'profile') {
            if (!req.user || !req.user.id) {
                return res.status(401).json({ error: 'Unauthorized: Token required' });
            }
            userId = req.user.id;
        } 
        // Handle requests to `/user/:id` (ID-based access)
        else if (req.params.id) {
            userId = req.params.id;
        } 
        // Return an error if neither is valid
        else {
            return res.status(400).json({ error: 'Invalid request' });
        }

        // Query the database for user details
        const result = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
