const APIkey = require('../../unsplashAPI');
const axios = require('axios');

module.exports = {
  getImages: (query, cb) => {
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=1&per_page=30&orientation=landscape`;
    axios.get(url, { headers: { Authorization: `Client-ID ${APIkey}`  } })
      .then((response) => {
        cb(null, response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
