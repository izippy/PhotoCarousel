const { Pool } = require('pg');
const faker = require('faker');
const client = require('../redis/index');

// const pool = new Pool({
//   user: 'guestly',
//   host: '52.53.249.156',
//   database: 'mydb',
//   password: 'password'
// });


const pool = new Pool({
  user: 'guestly',
  host: 'localhost',
  database: 'mydb',
  password: 'password'
});

const getListings = (req, res) => {
  const { listingID } = req.params;

  pool.query(`SELECT * FROM listingsreal WHERE id = ${listingID}`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.json(results.rows);
    }
  });
}

const getPhotos = (req, res) => {
  const { listingID } = req.params;

  pool.query(`SELECT * FROM photos WHERE listing_id = ${listingID} AND priority <= 4 ORDER BY priority ASC`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getMorePhotos = (req, res) => {
  const { listingID } = req.params;

  pool.query(`SELECT * FROM photos WHERE listing_id = ${listingID} AND priority >= 5 ORDER BY priority ASC`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(results.rows)
    }
  })
}

// const deleteItem = (req, res) => {
//   const { listingId } = req.params;

//   pool.query(`DELETE FROM photosTest WHERE listing_id = ${listingID}`, (err, results) => {
//     if(err){
//       console.log(err);
//     }
//   })
// }

// const updateItem = (req, res) => {
//   const { listingId } = req.params;

//   let randomnum = Math.floor(Math.random() * 100);

//   pool.query(`UPDATE photos SET ${listing_id} = ${randomnum} WHERE id = 9500000`, (err, results) => {
//     if(err){
//       console.log(err);
//     }
//   })
// }

const insertItem = (req, res) => {
  // const { listingID } = req.params;
  let randomListingID = Math.floor(Math.random() * (20000000 - 10000001)) + 10000001;
  let photoUrl = `https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg10.jpg`;
  let description = faker.lorem.sentence(5);
  let priority = Math.floor(Math.random() * (26 - 10)) + 10;
  pool.query(`INSERT INTO photos (listing_id, photourl, tinyphotourl, description, priority) VALUES (${randomListingID}, ${photoUrl}, ${photoUrl}, ${description}, ${priority})`, (err, results) => {
    if(err){
      console.log(err);
    } else {
      res.status(201).send(results);
    }
  })
}

module.exports = {
  pool,
  getListings,
  getPhotos,
  getMorePhotos,
  insertItem,
};