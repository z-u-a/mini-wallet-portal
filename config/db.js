// config/db.js
const { Pool } = require('pg');

// Initialize the database connection pool using environment variables
// Falls back to local defaults if environment variables aren't loaded yet
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'your_db_password',
  database: process.env.DB_NAME || 'mini_wallet',
  port: process.env.DB_PORT || 5433,
  
  // Advanced pooling settings for production readiness
  max: 10,                 // Maximum number of open clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error if a connection takes over 2 seconds
});

// Export a central query helper and the raw pool object
module.exports = {
  /**
   * Global query helper to run quick single SQL statements.
   * Automatically acquires a client from the pool, runs the query, and releases it.
   */
  query: (text, params) => pool.query(text, params),
  
  /**
   * The raw pool object. 
   * Essential for starting database transactions (ACID) when transferring money.
   */
  pool
};
