require('newrelic');
const express = require('express');
const client = require('./server/redis/index');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const expressStaticGzip = require('express-static-gzip');
const db2 = require('./server/db2/index.js');

const app = express();
const port = 3002;

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false}));

let checkerNum = 1;

app.use('/', expressStaticGzip(path.resolve(__dirname, './public/dist'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders(res, path) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  },
}));

app.use('/:listingID', expressStaticGzip(path.resolve(__dirname, './public/dist'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders(res, path) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  },
}));

app.get('/api/listings/info/:listingID', (req, res) => {
  const { listingID } = req.params;
  let redisKey = `listingID:${listingID}`
  client.get(redisKey, (err, results) => {
    if (results) {
      res.status(201).json({ source: 'cache', data: JSON.parse(results) })
    } else { 
      db2.query(`SELECT * FROM listingsreal WHERE id = ${listingID}`, (err, resultss) => {
        if (err) {
          console.log(err);
        } else {
          client.set(redisKey, JSON.stringify(resultss.rows), 'EX', 30);
          res.json(resultss.rows)
        }
      });
    }
  });
});

app.get('/api/listings/photos/initial/:listingID', (req, res) => {
  const { listingID } = req.params;
  let redisKey = `photoID:${listingID}`
  client.get(redisKey, (err, results) => {
    if (results) {
      console.log(results);
      res.status(201).json({ source: 'cache', data: JSON.parse(results) })
    } else { 
      db2.query(`SELECT * FROM photosTest WHERE listing_id = ${listingID} AND priority <= 4 ORDER BY priority ASC`, (err, resultss) => {
        if (err) {
          console.log(err);
        } else {
          client.set(redisKey, JSON.stringify(resultss.rows), 'EX', 30);
          res.json(resultss.rows)
        }
      });
    }
  });
});


app.get('/api/listings/photos/:listingID', (req, res) => {
  const { listingID } = req.params;
  let redisKey = `largePhotoID:${listingID}`
  client.get(redisKey, (err, results) => {
    if (results) {
      res.status(201).json({ source: 'cache', data: JSON.parse(results) })
    } else { 
      db2.query(`SELECT * FROM photosTest WHERE listing_id = ${listingID} AND priority >= 5 ORDER BY priority ASC`, (err, resultss) => {
        if (err) {
          console.log(err);
        } else {
          client.set(redisKey, JSON.stringify(resultss.rows), 'EX', 30);
          res.json(resultss.rows)
        }
      });
    }
  });
});

app.post('/api/listings/photos/initial/:listingID', (req, res) => {
  const { listingID } = req.params;
  let randomPhotoNum = Math.floor(Math.random() * 200) + 1;
  let randomPriority = Math.floor(Math.random() * 20) + 1;
  const photourl = `https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg${randomPhotoNum}.jpg`
  let desc = 'THES AARE WORDS SPELLED WRONG';
  http.post(url, data, params);
  db2.query(`INSERT INTO photos (listing_id, photourl, tinyphotourl, description, priority) VALUES (${listingID}, ${photourl}, ${photourl}, ${desc}, ${randomPriority})`, (err, response) => {
    if(err){
      console.log(err);
    }
  })
});

// app.get('/api/listings/info/:listingID', db2.getListings);
// app.get('/api/listings/photos/initial/:listingID', db2.getPhotos);
// app.get('/api/listings/photos/:listingID', db2.getMorePhotos);


// if(checkerNum === 1){
//   checkerNum = 2;
//   app.get('/api/listings/info/:listingID', db2.getListings);
//   app.get('/api/listings/photos/initial/:listingID', db2.getPhotos);
//   app.get('/api/listings/photos/:listingID', db2.getMorePhotos);
// } else if(checkerNum === 2) {
//   checkerNum = 1;
//   app.get('/api/listings/info2/:listingID', db2.getListings2);
//   app.get('/api/listings/photos2/initial/:listingID', db2.getPhotos2);
//   app.get('/api/listings/photos2/:listingID', db2.getMorePhotos2);
// }

app.listen(port, () => console.log(`Listening on port ${port}!`));
