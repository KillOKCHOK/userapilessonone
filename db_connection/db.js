const Pool = require('pg').Pool
const pool = new Pool({
  user: 'myapp',
  host: 'localhost',
  database: 'myxmasapp',
  password: '80ogipir',
  port: 5432,
})

module.exports = pool;