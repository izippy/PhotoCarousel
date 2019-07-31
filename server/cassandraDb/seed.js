const faker = require('faker');
const fs = require('fs');
const Uuid = require('cassandra-driver').types.Uuid;

const write = (writer, data) => {
  if (!writer.write(data)) {
    return new Promise((resolve) => {
      writer.once('drain', resolve);
    })
  }
}

const createPhotos = async () => {
  const stream = fs.createWriteStream('cassandraPhotosLessPriority.csv');
  const stream2 = fs.createWriteStream('cassandraPhotosGreaterPriority.csv');
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
          const id = Uuid.random();
          let randomImage =  Math.floor(Math.random() * Math.floor(399)) + 1;
          const photoUrl = `https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg${randomImage}.jpg`;
          const tinyPhotoUrl = `https://sdcimages123.s3-us-west-1.amazonaws.com/smallImages/SmallHouseImg${randomImage}.jpg`;
          const caption = faker.lorem.sentence(5);
          i++;
          let data = `${id}|${listing_id}|${photoUrl}|${tinyPhotoUrl}|${caption}|${priority}\n`
          if(listing_id % 100000 === 0){
            console.log(listing_id);
          }
          if(priority <= 4){
            const promise = write(stream, data);
            if (promise) {
              await promise
            }
          }else if (priority >= 5){
            promise = write(stream2, data);
            if (promise) {
              await promise
            }
          }
        }
        listing_id += 1;
  }
}

// let createListings = async () => {
  //   const stream2 = fs.createWriteStream('cassandraListingsOneMillion.csv')
  //   const max = 1000000
  //   let listing_id = 1
  //   let i = 0;
  //   while(listing_id <= max){
    //     let data = `${listing_id}\n`
    //     if(listing_id % 100000 === 0){
      //       console.log(listing_id);
      //     }
      //     const promise = write(stream2, data);
      //     if (promise) {
        //       await promise
        //     }
        //     listing_id += 1;
        //   }
        // }
        
createPhotos();


// db.query

// COPY listings (id, photourl, tinyurl, description, priority) FROM '/Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraListings.csv' WITH DELIMITER = '|';

// ALTER TABLE listings WITH compression = {'sstable_compression': 'LZ4Compressor', 'chunk_length_kb': 64};

// cassandra-loader -f /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraPhotos.csv -host localhost -schema "guestly.photos(id, listing_id, photourl, tinyurl, caption, priority)" -delim "|"
// ./cassandra-loader -f /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraListingsOneMillion.csv -host localhost -schema "guestly.listings(id)"
// csv2sstable guestly listings /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/schema.cql /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraListingsOneMillion.csv /Users/amar/Desktop/testSStables

// USING CASSIE LOADER
  // where cassandra-loader was built type
    // ./cassandra-loader -f /Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraPhotos.csv -host localhost -schema "guestly.photos(id, listing_id, photourl, tinyurl, caption, priority)" -delim "|"

//  28f9c330-b247-11e9-b8b8-8f588e4ffa59 | 127.0.0.1 |   QUERY |   127.0.0.1 |     2864 | {'consistency_level': 'ONE', 'page_size': '100', 'query': 'SELECT * FROM photos;', 'serial_consistency_level': 'SERIAL'} | Execute CQL3 query | 2019-07-29 21:23:51.139000+0000

// COPY photos(id, listing_id, photourl, tinyurl, description, priority) FROM '/Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraPhotos.csv' WITH DELIMITER = '|';
// CREATE TABLE listings (id int, PRIMARY KEY (id));
// COPY listings(id) FROM '/Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraListings.csv' WITH DELIMITER = '|';

