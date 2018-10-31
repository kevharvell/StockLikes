var axios = require('axios');
var cheerio = require('cheerio');
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.use(express.static(__dirname + '/public'))

// Parses requests from client to server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// HOME PAGE
app.get('/', function(req, res, next) {
  var context = {
    title: "Stock Likes Database"
  };
  res.render('home', context);
});

// ABOUT PAGE
app.get('/about', function(req, res, next) {
  var context = {
    title: "Stock Likes - About"
  };
  res.render('about', context);
});

// GAMING COMPANIES PAGE - GET
app.get('/gaming-companies', function(req, res, next) {
  var context = {
    title: "Stock Likes - Gaming Companies"
  };
  // Populate database to table
  let sqlShow = "SELECT comp_name FROM gaming_company";
  mysql.pool.query(sqlShow, function(err, rows, fields) {
    if(err) throw err;
    context.gaming_company = rows;
    res.render('gaming-companies', context);
  });
});

// GAMING COMPANIES PAGE - POST
app.post('/gaming-companies', function(req, res, next) {
  let sqlInsert = "INSERT INTO gaming_company (comp_name) VALUES (?)";
  let insertParams = [req.body.comp_nameInput];

  mysql.pool.query(sqlInsert, insertParams, function(err, result) {
    // Show results of INSERT in console
    if(err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    // Populate database to table
    res.redirect('/gaming-companies');
  });
});

// STOCKS PAGE - GET
app.get('/stocks', function(req, res, next) {
  var context = {
    title: "Stock Likes - Stocks"
  };
  // Populate database to table
  // Populate Gaming Company Drop-down menu
  let sqlShowComps = "SELECT id, comp_name FROM gaming_company";
  mysql.pool.query(sqlShowComps, function(err, rows, fields) {
    if(err) throw err;
    context.gaming_company = rows;

    //Populate Current Stocks Table
    let sqlShowComps = "SELECT gaming_company.id, gaming_company.comp_name, stock.ticker, stock.date, stock.price_close " 
                     + "FROM gaming_company "
                     + "INNER JOIN stock ON gaming_company.id = stock.companyID";
    mysql.pool.query(sqlShowComps, function(err, rows, fields) {
      if(err) throw err;
      context.stock = rows;
      res.render('stocks', context);
    });
  });
});

// STOCKS PAGE - POST
app.post('/stocks', function(req, res, next) {
  var context = {
    title: "Stock Likes - Stocks"
  };
  let sqlInsert = "INSERT INTO stock (ticker, date, price_close, companyID) VALUES (?, ?, ?, ?)";
  let insertParams = [req.body.tickerInput, req.body.dateInput, req.body.price_closeInput, req.body.gaming_companyInput];

  mysql.pool.query(sqlInsert, insertParams, function(err, result) {
    // Show results of INSERT in console
    if(err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    // Populate database to table
    res.redirect('/stocks');
  });
});

// TWITTERS PAGE - GET
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

// GENRES PAGE - GET
app.get('/genres', function(req, res, next) {
  var context = {
    title: "Stock Likes - Genres"
  };
 
   let sqlShow = "SELECT category FROM genre";
  mysql.pool.query(sqlShow, function(err, rows, fields) {
    if(err) throw err;
    context.genre = rows;
    res.render('genres', context);
  });
});



// GENRES PAGE - POST
app.post('/genres', function(req, res, next) {
  var context = {
    title: "Stock Likes - Genres"
  };
  let sqlInsert = "INSERT INTO genre (category) VALUES (?)";
  let insertParams = [req.body.category];

  mysql.pool.query(sqlInsert, insertParams, function(err, result) {
    // Show results of INSERT in console
    if(err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    // Populate database to table
    res.redirect('/genres');
  });
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
