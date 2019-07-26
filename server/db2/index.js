const { Pool } = require('pg');

const pool = new Pool({
  user: 'guestly',
  host: 'localhost',
  database: 'mydb',
  password: ''
  // port: 3003
})

let photosSchema = "CREATE TABLE photos (id SERIAL PRIMARY KEY, listing_id integer REFERENCES listings(id), photoUrl text NOT NULL, tinyPhotoUrl text NOT NULL, description text NOT NULL, priority INTEGER)";
let listingsSchema = "CREATE TABLE listings (id SERIAL PRIMARY KEY)";

db.query(photosSchema, (err, res) => {
    console.log(err, res);
  db.end();
});

db.query(listingsSchema, (err, res) => {
  console.log(err, res);
  db.end();
});

module.exports = pool;

// pool.query('INSERT INTO photos VALUES ', (err, res) => {
//   console.log(err, res);
//   pool.end();
// })