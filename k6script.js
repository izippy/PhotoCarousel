import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  discardResponseBodies: true,
  vus: 1,
  duration: '10s'
};

export default function() {
  // let randomNum = Math.floor(Math.random() * (9999999 - 9999500 + 1)) + 9999500;
  // http.get(`http://localhost:3002/api/listings/info/${randomNum}`);
  // http.get(`http://localhost:3002/api/listings/photos/initial/${randomNum}`);
  let randomNum = Math.floor(Math.random() * 500) + 1;
  let randomListingID = Math.floor(Math.random() * (20000000 - 10000001)) + 10000001;
  let photoUrl = `https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg10.jpg`;
  let description = 'This is a test'
  let priority = Math.floor(Math.random() * (26 - 10)) + 10;
  let formdata = {
    listing_id: randomListingID,
    photourl: photoUrl,
    tinyphotourl: photoUrl,
    description: description,
    priority: priority,
  };
  let headers = { "Content-Type": "application/x-www-form-urlencoded" };
  http.post(`http://localhost:3002/api/listings/photos/${randomNum}`, JSON.stringify(formdata), { headers: headers });
  // http.post(`http://localhost:3002/api/listings/photos/${randomNum}`);
  // sleep(1);
};