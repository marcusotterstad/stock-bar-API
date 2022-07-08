const config = {
  user: 'marcus',
  host: 'localhost',
  database: 'api_drinks',
  password: 'password',
  port: 5432
}

const {Pool} = require('pg');
const pool = new Pool(config);

console.log(pool.query("SELECT * FROM menu").rows);

const a = () => {
  var obj;
  pool.query("SELECT * FROM menu", (error, response) => {
    obj = response.rows;
  })
  console.log(obj)
}

a();
module.exports = pool;