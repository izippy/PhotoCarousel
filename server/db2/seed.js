const db = require('./index');
const faker = require('faker');
const fs = require('fs');

// let photosSchema = "CREATE TABLE IF NOT EXISTS photos (id SERIAL PRIMARY KEY, listing_id integer REFERENCES listings(id), photoUrl text NOT NULL, tinyPhotoUrl text NOT NULL, description text NOT NULL, priority INTEGER)";
// let listingsSchema = "CREATE TABLE IF NOT EXISTS listings (id SERIAL PRIMARY KEY)";
// INSERT INTO photos (10000001, 800, 'testing', 'testing2', 'testing3', 5);
// let userSchema = "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, listing_id integer REFERENCES listings(id), firstName text NOT NULL, lastName text NOT NULL, likedHomes integer REFERENCES users(listing_id)[])";
// UPDATE photos SET description = "IM A NEW DESCRIPTION" WHERE id = 9500000;
// db.query(listingsSchema, (err, res) => {
//   console.log(err, res);
//   db.end();
// });

// db.query(photosSchema, (err, res) => {
//     console.log(err, res);
//   db.end();
// });

/*
  listingsSchema
  CREATE TABLE IF NOT EXISTS listingsReal (id SERIAL PRIMARY KEY, title text, location text, rating real, totalRatings integer);
*/


const write = (writer, data) => {
  if (!writer.write(data)) {
      return new Promise((resolve) => {
          writer.once('drain', resolve);
      })
  }
}

const createPhotos = async () => {
  const stream = fs.createWriteStream('photos_noDelim.csv')
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
          let data = `${i}|${listing_id}|${photoUrl}|${tinyPhotoUrl}|${caption}|${priority}\n`
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
  const stream2 = fs.createWriteStream('listingsReal.csv')
  const max = 10000000
  let listing_id = 1
  let i = 0;
  let totalRatings;
  while(listing_id <= max){
    const title = faker.lorem.sentence(3);
    const location = `${faker.address.city()}, ${faker.address.state()}`;
    const rating = faker.finance.amount(0, 4, 1);
    if(listing_id <= 9000000){
      totalRatings = faker.random.number(200);
    }else if (listing_id > 9000000 && listing_id <= 9500000){
      totalRatings = faker.random.number(400);
    }else if (listing_id > 9500000 && listing_id <= 9700000){
      totalRatings = faker.random.number(600);
    }else if (listing_id > 9700000) {
      totalRatings = faker.random.number(1000);
    }
    let data = `${listing_id}|${title}|${location}|${rating}|${totalRatings}\n`
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

// pv /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/db2/listingsReal.csv | psql -U guestly -d mydb -c "COPY listingsReal FROM STDIN" DELIMITERS '|'

// seedListings();
// seedPhotos();


// 1 | 1 | URL | OTHERURL | some string. | 1

// COPY photos FROM { 'test.csv' | PROGRAM 'command' | STDIN } [ [USING] DELIMITERS '|' ]
// ./cassandra-loader -f /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraListingsOneMillion.csv -host localhost -schema "guestly.listings(id)"
// pv /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraListingsOneMillion.csv | ./cassandra-loader -f STDIN -host localhost -schema "guestly.listings(id)"
// pv /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraPhotos.csv | ./cassandra-loader -f STDIN -host localhost -schema "guestly.photos(id, listing_id, photoUrl, tinyUrl, caption, priority)" -delim "|"
// pv /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraPhotosLessPriority.csv | ./cassandra-loader -f STDIN -host localhost -schema "guestly.photosLessPriority(id, listing_id, photoUrl, tinyUrl, caption, priority)" -delim "|"
// pv /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/photos.csv | psql -U guestly -d mydb -c "COPY photos FROM STDIN DELIMITERS '|';"
// pv /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/photos_noDelim.csv | psql -U guestly -d mydb -c "COPY photosTest FROM STDIN DELIMITERS '|';"
// pv /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/db2/listingsReal.csv | psql -U guestly -d mydb -c "COPY listingsReal FROM STDIN DELIMITERS '|';"

// COPY photos FROM '/Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/photos.csv' DELIMITERS '|';
// COPY listings FROM '/Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/listings.csv' DELIMITERS '|';

// CREATE THE INDEX TO SPEED UP THE QUERY TIMES YAHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!
// CREATE INDEX index_id_priority_listings ON photos (id, listing_id, priority);
// CREATE INDEX index_photos ON photos USING btree (listing_id, priority DESC);
  // speed => 0.042 ms
// CREATE INDEX index_photos ON photos USING btree (listing_id, priority ASC);
  // speed =>
// CREATE INDEX index_photos ON photos USING btree (listing_id DESC, priority);
  // speed => 
// CREATE INDEX index_photos ON photos USING btree (listing_id ASC, priority);
  // speed => 
