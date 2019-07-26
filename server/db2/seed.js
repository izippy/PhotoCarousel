const db = require('./index');
const faker = require('faker');
const unsplash = require('../db/unsplashHelper');
const fs = require('fs');
// let stream = fs.createWriteStream('test.csv');

let photosSchema = "CREATE TABLE photos (id SERIAL PRIMARY KEY, listing_id integer REFERENCES listings(id), photoUrl text NOT NULL, tinyPhotoUrl text NOT NULL, description text NOT NULL, priority INTEGER)";
let listingsSchema = "CREATE TABLE listings (id SERIAL PRIMARY KEY)";
// db.query(photosSchema, (err, res) => {
  //   console.log(err, res);
//   db.end();
// });

// db.query(listingsSchema, (err, res) => {
//   console.log(err, res);
//   db.end();
// });

const generatePhoto = () => {
  let listing_id = 1;

  let i = 0;

  unsplash.getImages('house', (err, houseData) => {
    if (err) {
      console.log(err);
    } else {
      while (listing_id <= 100000) {
        let randomNumber =  Math.floor(Math.random() * Math.floor(29));
        if (randomNumber < 5) {
          randomNumber = 5;
        }
        
        for (let priority = 0; priority < randomNumber; priority++) {
          let randomImage =  Math.floor(Math.random() * Math.floor(29));
          const photoUrl = houseData.results[randomImage].urls.regular;
          const tinyPhotoUrl = houseData.results[randomImage].urls.thumb;
          const caption = faker.lorem.sentence(5);
          // (DEFAULT, ${listing_id}, '${photoUrl}', '${tinyPhotoUrl}', '${caption}', ${priority})
          i++;
          let data = `${i} | ${listing_id} | ${photoUrl} | ${tinyPhotoUrl} | ${caption} | ${priority} \n`
          if(listing_id % 50000 === 0){
            console.log(listing_id);
          }
          stream.write(data);
          if(listing_id === 100000){
            stream.end();
          }
        }
        listing_id += 1;
      }
    }
  });
};

const write = (writer, data) => {
  if (!writer.write(data)) {
      return new Promise((resolve) => {
          writer.once('drain', resolve)
      })
  }
}

const run = () => {
  const stream = fs.createWriteStream('test.csv')
  const max = 10000000
  let listing_id = 1
  let i = 0;
  unsplash.getImages('house', async (err, houseData) => {
  while (listing_id <= max) {
    let randomNumber =  Math.floor(Math.random() * Math.floor(5));
        if (randomNumber < 5) {
          randomNumber = 5;
        }
        
        for (let priority = 0; priority < randomNumber; priority++) {
          let randomImage =  Math.floor(Math.random() * Math.floor(5));
          const photoUrl = houseData.results[randomImage].urls.regular;
          const tinyPhotoUrl = houseData.results[randomImage].urls.thumb;
          const caption = faker.lorem.sentence(5);
          i++;
          let data = `${i} | ${listing_id} | ${photoUrl} | ${tinyPhotoUrl} | ${caption} | ${priority} \n`
          if(listing_id % 100000 === 0){
            console.log(listing_id);
          }
          const promise = write(stream, data);
          if (promise) {
            await promise
          }
        }

        listing_id += 1;
  }
});
}

run();

let createListings = async () => {
  for(var i = 0; i <= 100000; i++){
    db.query(`INSERT INTO listings VALUES (DEFAULT)`, (err, res) => {
      if(i === 100000){
        db.end();
      }
    });
  }
}

// createListings();
// generatePhoto();


// 1 | 1 | URL | OTHERURL | some string. | 1

// delimiter = bar

// COPY photos FROM { 'test.csv' | PROGRAM 'command' | STDIN } [ [USING] DELIMITERS '|' ]

// COPY photos FROM '/Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/test.csv' DELIMITERS '|';



//  100000 |  6828 |  https://images.unsplash.com/photo-1506126279646-a697353d3166?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjgzMTc3fQ  |  https://images.unsplash.com/photo-1506126279646-a697353d3166?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjgzMTc3fQ  |  Non facilis excepturi qui dolor.  |        9