var axios = require('axios');
var cheerio = require('cheerio');
var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res, next) {
  var context = {
    title: "Stock Likes Database"
  };
	/*mysql.pool.query('INSERT INTO diagnostic (`text`) VALUES ("MySQL is Working!")', function(err) {
	  mysql.pool.query('SELECT * FROM diagnostic', function(err, rows, fields){
		  context.results = JSON.stringify(rows);
		  res.render('home',context);
		});
	});*/
  res.render('home', context);
});

app.get('/about', function(req, res, next) {
  var context = {
    title: "Stock Likes - About"
  };
  res.render('about', context);
});

app.get('/gaming-companies', function(req, res, next) {
  var context = {
    title: "Stock Likes - Gaming Companies"
  };
  res.render('gaming-companies', context);
});

app.post('/gaming-companies', function(req, res, next) {
  var context = {
    title: "Stock Likes - Gaming Companies"
  };
  let sql = "INSERT INTO gaming_company (comp_name) values ('comp_nameInput.value')";
  mysql.pool.query(sql, function(err, result) {
    if(err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    res.render('gaming-companies', context);
  }); 
});

app.get('/stocks', function(req, res, next) {
  var context = {
    title: "Stock Likes - Stocks"
  };
  res.render('stocks', context);
});

app.get('/twitters', function(req, res, next) {
  var context = {
    title: "Stock Likes - Twitter Pages",
  };
  let url = `https://twitter.com/NintendoAmerica`;
  axios({
      method: 'get',
      url
  })
  .then(function (response) {
      let $ = cheerio.load(response.data);
      var likes = [];
      var buzzCount = 0;
      $(".ProfileTweet-actionCount").each((i, elem) => {
          likes[i] = parseInt(elem.attribs["data-tweet-stat-count"]);
          if(!Number.isNaN(likes[i])) {
            buzzCount += likes[i];
          }
      });
      context.buzzCount = buzzCount;
      res.render('twitters', context);
  })

  .catch(function (error) {
      console.log(error);
  });

  //res.render('twitters', context);
});

app.get('/games', function(req, res, next) {
  var context = {
    title: "Stock Likes - Games"
  };
  res.render('games', context);
});

app.get('/genres', function(req, res, next) {
  var context = {
    title: "Stock Likes - Genres"
  };
  res.render('genres', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
