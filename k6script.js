import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  discardResponseBodies: true,
  vus: 150,
  duration: '5m'
};

export default function() {
  let randomNum = Math.floor(Math.random() * (9999999 - 9999500 + 1)) + 9999500;
  // http.get(`http://localhost:3002/api/listings/info/${randomNum}`);
  http.get(`http://localhost:3002/api/listings/photos/initial/${randomNum}`);
  // http.get(`http://localhost:3002/api/listings/photos/${randomNum}`);
  // http.post(`/api/listings/photos/initial/${randomNum}`);

  // sleep(1);
};