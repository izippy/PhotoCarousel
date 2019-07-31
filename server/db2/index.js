const { Pool } = require('pg');

const pool = new Pool({
  user: 'guestly',
  host: 'localhost',
  database: 'mydb'
});

const getListings = (req, res) => {
  const { listingID } = req.params;

  pool.query(`SELECT * FROM listingsreal WHERE id = ${listingID}`, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(results.rows);
  });
}

const getPhotos = (req, res) => {
  const { listingID } = req.params;

  pool.query(`SELECT * FROM photosTest WHERE listing_id = ${listingID} AND priority <= 4 ORDER BY priority ASC`, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(results.rows);
  })
}

const getMorePhotos = (req, res) => {
  const { listingID } = req.params;

  pool.query(`SELECT * FROM photosTest WHERE listing_id = ${listingID} AND priority >= 5 ORDER BY priority ASC`, (err, results) => {
    if(err){
      console.log(err);
    }
    res.status(200).json(results.rows);
  })
}

// As of right now the use for the functions below are limited

const deleteItem = (req, res) => {
  const { listingId } = req.params;

  pool.query(`DELETE FROM photosTest WHERE listing_id = ${listingID}`, (err, results) => {
    if(err){
      console.log(err);
    }
  })
}

const updateItem = (req, res) => {
  const { listingId } = req.params;

  let randomnum = Math.floor(Math.random() * 100);

  pool.query(`UPDATE photos SET ${listing_id} = ${randomnum} WHERE id = 9500000`, (err, results) => {
    if(err){
      console.log(err);
    }
  })
}

const insertItem = (req, res) => {
  const { listingID } = req.params;

  pool.query(`INSERT INTO photos (id, listing_id, photourl, tinyphotourl, description, priority) VALUES (40000001, 800, 'testing', 'testing2', 'testing3', 5)`, (err, results) => {
    if(err){
      console.log(err);
    }
  })
}

module.exports = {
  pool,
  getListings,
  getPhotos,
  getMorePhotos
};