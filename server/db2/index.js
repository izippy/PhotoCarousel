const { Pool } = require('pg');

const pool = new Pool({
  user: 'guestly',
  host: 'localhost',
  database: 'mydb',
  password: ''
  // port: 3003
})

module.exports = pool;