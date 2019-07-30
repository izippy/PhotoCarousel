const { Pool } = require('pg');

const pool = new Pool({
  user: 'guestly',
  host: 'localhost',
  database: 'mydb'
});

const getListings = (req, res) => {
  const { listingID } = req.params;

  pool.query(`SELECT * FROM listings WHERE id = ${listingID}`, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(results.rows);
  });
}

const getPhotos = (req, res) => {
  const { listingID } = req.params;
  console.log(req.params);

  pool.query(`SELECT * FROM photosTest WHERE listing_id = ${listingID} AND priority <= 4`, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(results.rows);
  })
}

const getMorePhotos = (req, res) => {
  const { listingID } = req.params;

  pool.query(`SELECT * FROM photosTest WHERE listing_id = ${listingID} AND priority >= 5`, (err, results) => {
    if(err){
      console.log(err);
    }
    res.status(200).json(results.rows);
  })
}

module.exports = {
  pool,
  getListings,
  getPhotos,
  getMorePhotos
};