// Purpose: Establish connection to the database
const { Pool } = require('pg');

const pool = new Pool({
  user: 'YOUR USERNAME',
  host: 'ENTER HOST',
  database: 'employee_tracker',
  password: 'YOUR PASSWORD',
  port: 5432,
});

module.exports = pool;