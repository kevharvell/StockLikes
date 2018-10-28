
const axios = require('axios');
const cheerio = require('cheerio');
const url = `https://twitter.com/SEGA`;

  axios({
      method: 'get',
      url
  })
  .then(function (response) {
      let $ = cheerio.load(response.data);
      var likes = [];
      var sum = 0;
      $(".ProfileTweet-actionCount").each((i, elem) => {
          likes[i] = parseInt(elem.attribs["data-tweet-stat-count"]);
          if(!Number.isNaN(likes[i])) {
            sum += likes[i];
          }
      });
      
      console.log(sum);
  })
  .catch(function (error) {
      console.log(error);
  });