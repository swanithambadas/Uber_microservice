require('dotenv').config();
const express = require('express');
const loginRouter = require('./login'); // Import login router
const signupRouter = require('./signup'); // Import signup router
const profileRouter = require('./get-profile'); // Import the profile router

const user_app = express();
user_app.use(express.json()); // Middleware to parse JSON

// Use routers
user_app.use('/user', loginRouter); // Routes prefixed with /auth
user_app.use('/user', signupRouter); // Routes prefixed with /auth
user_app.use('/user', profileRouter); // Mount the profile route under /user

const PORT = process.env.PORT || 3000;
user_app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
