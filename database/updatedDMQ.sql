/*
GAMING STOCK LIKES
Description: Gaming Stock Likes is a database centered around gaming companies that hopefully will be 
utilized one day as a stock market sentiment indicator. A stock market sentiment indicator can be used 
to see how a group feels about a certain market. In our case, we will be using various gaming companies’ 
Twitter pages to sum up Likes, Retweets, and Comments in order to create a “buzz” factor. The higher 
the buzz factor, the more popular and trending a gaming company is. Additionally, we will feature games 
released by each company along with stock ticker data such as the last closing price of the stock.
Authors: Kevin Harvell and Will Darnell
Last Update: 12/2/2018
*/


--show all gaming companies
SELECT comp_name FROM gaming_company;

--show all stocks
SELECT companyID, ticker, price_close FROM stock;

--show all twitter pages
SELECT companyID, buzz, url FROM twitter; 

--show all games 
SELECT companyID, game_name FROM game;

--show all genres
SELECT category FROM genre;

--home page display
SELECT gaming_company.id, gaming_company.comp_name, stock.ticker, stock.price_close, twitter.url, twitter.buzz, game.game_name 
FROM gaming_company LEFT JOIN stock ON gaming_company.id = stock.companyID LEFT JOIN twitter ON gaming_company.id = twitter.companyID 
LEFT JOIN game ON gaming_company.id = game.companyID;

--insert into gaming companies
INSERT INTO gaming_company (comp_name) VALUES (?)

--delete a gaming company
DELETE FROM gaming_company WHERE id = ?

--update a gaming company
UPDATE gaming_company SET comp_name = ? WHERE id = ?

--show current stocks table
SELECT gaming_company.id, gaming_company.comp_name, stock.id, stock.ticker, DATE_FORMAT(stock.date_recorded, '%m/%d/%Y') AS date_recorded, stock.price_close  
FROM gaming_company INNER JOIN stock ON gaming_company.id = stock.companyID;

--insert into stocks table
INSERT INTO stock (ticker, date_recorded, price_close, companyID) VALUES (?, ?, ?, ?);

--delete from stocks table
DELETE FROM stock WHERE id = ?;

--update stocks table
UPDATE stock SET companyID = ?, ticker = ?, date_recorded = ?, price_close = ? WHERE id = ?;

--show current twitter pages table
SELECT gaming_company.id, gaming_company.comp_name, twitter.id, twitter.url, DATE_FORMAT(twitter.date_recorded, '%m/%d/%Y') AS date_recorded, twitter.buzz 
FROM gaming_company INNER JOIN twitter ON gaming_company.id = twitter.companyID;

--insert into twitter table
INSERT INTO twitter (url, date_recorded, buzz, companyID) VALUES (?, ?, ?, ?);

--delete from twitter
DELETE FROM twitter WHERE id = ?;

--update twitter table
UPDATE twitter SET companyID = ?, url = ?, date_recorded = ? WHERE id = ?;

--show current games table
SELECT gaming_company.id, gaming_company.comp_name, game.id, game.game_name, genre.category, DATE_FORMAT(game.release_date, '%m/%d/%Y') AS release_date, game.rating 
FROM gaming_company INNER JOIN game ON gaming_company.id = game.companyID 
INNER JOIN game_genre ON game.id = game_genre.gameID INNER JOIN genre ON game_genre.genreID = genre.id 
ORDER BY game.game_name ASC;

--insert into games table
INSERT INTO game (game_name, release_date, rating, companyID) VALUES (?, ?, ?, ?);

--delete from games table
DELETE FROM game WHERE id = ?;

--update games table
UPDATE game SET game_name = ?, release_date = ?, rating = ?, companyID = ? WHERE id = ?;

--show genres
SELECT id, category FROM genre;

--insert into genres
INSERT INTO genre (category) VALUES (?);

--delete genres
DELETE genre, game_genre, game FROM genre RIGHT JOIN game_genre ON genre.id = game_genre.genreID
RIGHT JOIN game ON game_genre.gameID = game.id WHERE game_genre.genreID = ?;

--update genres
UPDATE genre SET category = ? WHERE id = ?;

--show search results
SELECT gaming_company.id, gaming_company.comp_name, stock.ticker, stock.price_close, twitter.url, twitter.buzz, game.game_name 
FROM gaming_company LEFT JOIN stock ON gaming_company.id = stock.companyID 
LEFT JOIN twitter ON gaming_company.id = twitter.companyID LEFT JOIN game ON gaming_company.id = game.companyID 
WHERE gaming_company.comp_name LIKE ?;