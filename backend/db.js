const { Pool } = require('pg');

// PostgreSQL connection setup
const pool = new Pool({
    user: 'postgres',        // Your PostgreSQL username
    host: 'localhost',            // Database server
    database: 'uber', // The database name
    password: 'SwanSu@8811',    // Your PostgreSQL password
    port: 5432                    // Default PostgreSQL port
});

module.exports = pool;
