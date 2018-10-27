/*
GAMING STOCK LIKES
Description: Gaming Stock Likes is a database centered around gaming companies that hopefully will be 
utilized one day as a stock market sentiment indicator. A stock market sentiment indicator can be used 
to see how a group feels about a certain market. In our case, we will be using various gaming companies’ 
Twitter pages to sum up Likes, Retweets, and Comments in order to create a “buzz” factor. The higher 
the buzz factor, the more popular and trending a gaming company is. Additionally, we will feature games 
released by each company along with stock ticker data such as the last closing price of the stock.
Authors: Kevin Harvell and Will Darnell
Last Update: 10/26/2018
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

--add a new gaming company
INSERT INTO `gaming_company` (comp_name) values (:comp_name);


--add a new stock
INSERT INTO `stock` (ticker, date, price_close, companyID) values (:ticker, :date, :price_close, :id_value);


--add a new twitter page
INSERT INTO `twitter` (date, url, buzz, companyID) values (:date, :url, :buzz, :id_value); 



--add a new game 
INSERT INTO `game` (game_name, release_date, rating, companyID) values (:gameName, :date, :rating, :companyID_value);


--add a new genre
INSERT INTO `genre` (category) values (:category);



--edit gaming company
UPDATE gaming_company SET comp_name = :comp_name WHERE id = :gaming_company_ID_from_input; 

--edit stock
UPDATE stock SET ticker = :ticker_value, date = :date, price_close = :price_close, buzz = :buzz, WHERE id = :stock_ID_from_input;



--edit twitter page
UPDATE twitter SET date= :date, date = :date_value, url = :url, buzz = :buzz, WHERE id = :twitter_ID_from_input;




--edit game
UPDATE game SET game_name = :gameName, release_date = :date, rating = :rating WHERE id = :game_id_input;



--delete gaming company
DELETE FROM gaming_company WHERE id = :gaming_company_ID_from_selection;




--delete stock
DELETE FROM stock WHERE id = :stock_ID_from_selection;


--delete twitter page
DELETE FROM twitter WHERE id = :twitter_ID_from_selection;


--delete game
DELETE FROM game WHERE id = :game_name_selection;


--delete genre
DELETE FROM genre WHERE id = :genre_from_selection;