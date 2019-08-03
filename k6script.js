import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 100 },
    { duration: "10s", target: 600 },
    { duration: "10s", target: 800 },
    { duration: "4m", target: 1000 },
    { duration: "10s", target: 800 },
    { duration: "10s", target: 600 },
    { duration: "10s", target: 100 },
    { duration: "10s", target: 15 },
    { duration: "10s", target: 0 },
  ],
  // rps: 1000,
  // vus: 5,
  // duration: '10s'
};

export default function() {
  // let randomNum = Math.floor(Math.random() * 9999999) + 1;
  let randomNum = Math.floor(Math.random() * (1000 - 950 + 1)) + 950;
  // http.get(`http://localhost:3002/api/listings/info/${randomNum}`);
  http.get(`http://localhost:3002/api/listings/photos/initial/${randomNum}`);
  // http.get(`http://localhost:3002/api/listings/photos/${randomNum}`);
  sleep(1);
};