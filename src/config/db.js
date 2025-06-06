const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD
});

module.exports = pool;
