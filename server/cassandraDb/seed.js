const db = require('./index');
const faker = require('faker');
const unsplash = require('../db/unsplashHelper');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const query = "INSERT INTO testing (id, photourl, tinyurl, description, priority) values (now(), 'oihoi', 'sldkfjlksd', 'sldkhoisghois', 2);"

const write = (writer, data) => {
  if (!writer.write(data)) {
      return new Promise((resolve) => {
          writer.once('drain', resolve)
      })
  }
}

const run = () => {
  const stream = fs.createWriteStream('cassandraTest.csv')
  const max = 10000
  let listing_id = 1
  let i = 0;
  unsplash.getImages('house', async (err, houseData) => {
  while (listing_id <= max) {
    let randomNumber =  Math.floor(Math.random() * Math.floor(5));
        if (randomNumber < 5) {
          randomNumber = 5;
        }
        
        for (let priority = 0; priority < randomNumber; priority++) {
          // function uuidv4() {
          //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          //     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          //     return v.toString(16);
          //   });
          // }
          let randomImage =  Math.floor(Math.random() * Math.floor(5));
          const photoUrl = houseData.results[randomImage].urls.regular;
          const tinyPhotoUrl = houseData.results[randomImage].urls.thumb;
          const caption = faker.lorem.sentence(5);
          i++;
          let data = `${uuidv4()} | ${photoUrl} | ${tinyPhotoUrl} | ${caption} | ${priority} \n`
          if(listing_id % 100 === 0){
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


// db.query

// COPY testing (id, photourl, tinyurl, description, priority) FROM '/Users/amar/Documents/hrsf119/SDC/PhotoCarousel-1/server/cassandraDb/cassandraTest.csv' WITH DELIMITER = '|';