const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../utils/dbUser');
const Joi = require('joi'); // For input validation
// code to check server connection and db connection.
// const app = express();

// // Middleware to parse JSON requests
// app.use(express.json());

// // Basic health check endpoint (to ensure the server runs)
// app.get('/', (req, res) => {
//     res.send('Server is running!');
// });

// // Start the server at port 3000
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// checking for the DB connection
// async and await are used to perform asynchronus activities and await is used to wait
// till the query is executed and returned with valid or error response.
// app.get('/test-db', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT NOW()'); // Test query
//         res.send(result.rows[0]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Database connection failed!');
//     }
// });

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        // Step 1: Validate input
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            role: Joi.string().valid('rider', 'driver').required()
        });

        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, email, password, role } = req.body;

        // Step 2: Check if email already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Step 3: Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Step 4: Insert user into the database
        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
            [name, email, passwordHash, role]
        );

        res.status(201).json({  
            message: result.rows[0].name + ' is signed up successfully',
            user: result.rows[0] ,    
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
