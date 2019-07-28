const db = require('./index');
const faker = require('faker');
const fs = require('fs');

let photosSchema = "CREATE TABLE IF NOT EXISTS photos (id SERIAL PRIMARY KEY,\
                   listing_id integer REFERENCES listings(id), photoUrl text NOT NULL, \
                   tinyPhotoUrl text NOT NULL, description text NOT NULL, priority INTEGER)";
let listingsSchema = "CREATE TABLE IF NOT EXISTS listings (id SERIAL PRIMARY KEY)";
let userSchema = "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, listing_id integer\
                    REFERENCES listings(id), firstName text NOT NULL, lastName text NOT NULL,\
                     likedHomes integer REFERENCES users(listing_id)[])";

db.query(listingsSchema, (err, res) => {
  console.log(err, res);
  db.end();
});

db.query(photosSchema, (err, res) => {
    console.log(err, res);
  db.end();
});


const write = (writer, data) => {
  if (!writer.write(data)) {
      return new Promise((resolve) => {
          writer.once('drain', resolve);
      })
  }
}

const createPhotos = async () => {
  const stream = fs.createWriteStream('photos.csv')
  const max = 10000000
  let listing_id = 1
  let i = 0;
  let randomNumber;
  while (listing_id <= max) {
    if(listing_id <= 9000000){
      randomNumber = Math.floor(Math.random() * (3)) + 1;
    }else if (listing_id > 9000000 && listing_id <= 9500000){
      randomNumber = Math.floor(Math.random() * (11 - 7) + 7);
    }else if (listing_id > 9500000 && listing_id <= 9700000){
      randomNumber = Math.floor(Math.random() * (16 - 10) + 10);
    }else if (listing_id > 9700000) {
      randomNumber = Math.floor(Math.random() * (26 - 15) + 15);
    }
        
        for (let priority = 0; priority < randomNumber; priority++) {
          let randomImage =  Math.floor(Math.random() * Math.floor(399)) + 1;
          const photoUrl = `https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg${randomImage}.jpg`;
          const tinyPhotoUrl = `https://sdcimages123.s3-us-west-1.amazonaws.com/smallImages/SmallHouseImg${randomImage}.jpg`;
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
}


let createListings = async () => {
  const stream2 = fs.createWriteStream('listings.csv')
  const max = 10000000
  let listing_id = 1
  let i = 0;
  while(listing_id <= max){
    let data = `${listing_id}\n`
    if(listing_id % 100000 === 0){
      console.log(listing_id);
    }
    const promise = write(stream2, data);
    if (promise) {
      await promise
    }
    listing_id += 1;
  }
}

// createListings();
// createPhotos();

// let seedListings = () => {
  // return `pv /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/listings.csv | psql -U guestly -d mydb -c "COPY listings FROM STDIN DELIMITERS '|';"`
// }

// let seedPhotos = () => {
//   return `pv /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/photos.csv | psql -U guestly -d mydb -c "COPY photos FROM STDIN DELIMITERS '|';"`
// }

// seedListings();
// seedPhotos();


// 1 | 1 | URL | OTHERURL | some string. | 1

// COPY photos FROM { 'test.csv' | PROGRAM 'command' | STDIN } [ [USING] DELIMITERS '|' ]

// pv /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/photos.csv | psql -U guestly -d mydb -c "COPY photos FROM STDIN DELIMITERS '|';"

// COPY photos FROM '/Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/photos.csv' DELIMITERS '|';
// COPY listings FROM '/Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/listings.csv' DELIMITERS '|';

// CREATE THE INDEX TO SPEED UP THE QUERY TIMES YAHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!
// CREATE INDEX index_id_priority_listings ON photos (id, listing_id, priority);