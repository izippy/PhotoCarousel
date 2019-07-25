const db = require('./index');
const faker = require('faker');
const unsplash = require('../db/unsplashHelper');

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

const generatePhoto = async () => {
  let listing_id = 1;

  unsplash.getImages('house', (err, houseData) => {
    if (err) {
      console.log(err);
    } else {
      while (listing_id <= 12000) {
        let randomNumber =  Math.floor(Math.random() * Math.floor(29));
        if (randomNumber < 5) {
          randomNumber = 5;
        }

        for (let priority = 0; priority < randomNumber; priority++) {
          let randomImage =  Math.floor(Math.random() * Math.floor(29));
          const photoUrl = houseData.results[randomImage].urls.regular;
          const tinyPhotoUrl = houseData.results[randomImage].urls.thumb;
          const caption = faker.lorem.sentence(5);
          db.query(`INSERT INTO photos VALUES (DEFAULT, ${listing_id}, '${photoUrl}', '${tinyPhotoUrl}', '${caption}', ${priority})`, (err, res) => {
            if(listing_id === 12000){
              db.end();
            }
          })
        }
        listing_id += 1;
      }
    }
  });
};

let createListings = async () => {
  for(var i = 0; i <= 12000; i++){
    db.query(`INSERT INTO listings VALUES (DEFAULT)`, (err, res) => {
      if(i === 12000){
        db.end();
      }
    });
  }
}

createListings();
generatePhoto();