const { Pool } = require('pg');
const client = require('../redis/index');

const pool = new Pool({
  user: 'guestly',
  host: 'localhost',
  database: 'mydb'
});

// const getListings = (req, res) => {
//   const { listingID } = req.params;
//   let redisKey = `listingID:${listingID}`;
//   // pool.query(`SELECT * FROM listingsreal WHERE id = ${listingID}`, (err, results) => {
//   //   if (err) {
//   //     console.log(err);
//   //   } else {
//   //     res.json(results.rows);
//   //     client.set(redisKey, results.rows, 'EX', 30);
//   //   }
//   // });
//   client.get(redisKey, (err, results) => {
//     if (results) {
//       res.status(201).json({ source: 'cache', data: JSON.parse(results) })
//     } else { 
//       pool.query(`SELECT * FROM listingsreal WHERE id = ${listingID}`, (err, results) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("MARRVINNNN");
//           client.set(redisKey, JSON.stringify(results.rows), 'EX', 10);
//           res.json(results.rows)
//         }
//       });
//     }
//   });

// }

// const getPhotos = (req, res) => {
//   const { listingID } = req.params;
//   // const photosRedisKey = `photosLessPriority:${listingID}`;
//   // client.get(photosRedisKey, (err, photos) => {
//   //   if (photos) {
//   //     console.log('hereeee2');
//   //     res.status(201).json({ source: 'cache', data: JSON.parse(photos) })
//   //   } else { 
//   //     console.log("W:KJAL:SKJF");
//   //     pool.query(`SELECT * FROM photosTest WHERE listing_id = ${listingID} AND priority <= 4 ORDER BY priority ASC`, (err, results) => {
//   //       if (err) {
//   //         console.log(err);
//   //       } else {
//   //         client.set(photosRedisKey, JSON.stringify(results.rows), 'EX', 10);
//   //         res.json(results.rows)
//   //       }
//   //     });
//   //   }
//   // });

//   let redisKey = `photosid:${listingID}`;

//   pool.query(`SELECT * FROM photosTest WHERE listing_id = ${listingID} AND priority <= 4 ORDER BY priority ASC`, (err, results) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.status(200).json(results.rows)
//     }
//   })
// }

// const getMorePhotos = (req, res) => {
//   const { listingID } = req.params;
//   let redisKey = `otherPhotosID:${listingID}`;

//   pool.query(`SELECT * FROM photosTest WHERE listing_id = ${listingID} AND priority >= 5 ORDER BY priority ASC`, (err, results) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.status(200).json(results.rows)
//     }
//   })
// }

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

  pool.query(`INSERT INTO photos (id, listing_id, photourl, tinyphotourl, description, priority) VALUES (40000001, 800, 'testing', 'testing2', 'testing3', 5)`, (err, results) => {
    if(err){
      console.log(err);
    } else {
      res.status(200).send(results);
    }
  })
}

module.exports = pool;