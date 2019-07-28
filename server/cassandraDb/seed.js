const db = require('./index');
const faker = require('faker');
// const unsplash = require('../db/unsplashHelper');
const fs = require('fs');
const sslWriter = require('org.apache.cassandra.io.sstable.CQLSSTableWriter');
// const uuidv4 = require('uuid/v4');

// const query = "INSERT INTO testing (id, photourl, tinyurl, description, priority) values (now(), 'oihoi', 'sldkfjlksd', 'sldkhoisghois', 2);"
// let id = 'CREATE TABLE photos (id int, listing_id int, photourl text, tinyurl text, description text, priority int, PRIMARY KEY (id));'
// COPY photos(id, listing_id, photourl, tinyurl, description, priority) FROM '/Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraPhotos.csv' WITH DELIMITER = '|';
// CREATE TABLE listings (id int, PRIMARY KEY (id));
// COPY listings(id) FROM '/Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraListings.csv' WITH DELIMITER = '|';
const write = (writer, data) => {
  if (!writer.write(data)) {
      return new Promise((resolve) => {
          writer.once('drain', resolve);
      })
  }
}

const run = async () => {
  const stream = fs.createWriteStream('cassandraPhotos.csv')
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
  const stream2 = fs.createWriteStream('cassandraListingsOneMillion.csv')
  const max = 1000000
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


createListings();
// run();


// db.query

// COPY listings (id, photourl, tinyurl, description, priority) FROM '/Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraListings.csv' WITH DELIMITER = '|';

// ALTER TABLE listings WITH compression = {'sstable_compression': 'LZ4Compressor', 'chunk_length_kb': 64};


// csv2sstable guestly listings /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/schema.cql /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraListingsOneMillion.csv /Users/amar/Desktop/testSStables