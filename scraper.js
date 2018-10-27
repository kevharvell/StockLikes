
const axios = require('axios');

let url = `https://twitter.com/NintendoAmerica`;
  axios({
      method: 'get',
      url
  })
  .then(function (response) {
      let twitterScrape = response.data;
      var likes = twitterScrape.querySelectorAll("span.ProfileTweet-actionCountForPresentation");
      console.log(likes);
  })
  .catch(function (error) {
      console.log(error);
  });