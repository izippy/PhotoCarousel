
const axios = require('axios');

module.exports = {
  getImages: (query, cb) => {
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=1&per_page=30&orientation=landscape`;
    axios.get(url, { headers: { Authorization: 'Client-ID 71f41bb88ae6fc4b5f052fa3034a6b224d4e5b5c76cc355ab2f6957d4ef05834' } })
      .then((response) => {
        cb(null, response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
