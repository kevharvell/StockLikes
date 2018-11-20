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

DROP TABLE IF EXISTS `gaming_company`;
CREATE TABLE `gaming_company`(
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`comp_name` varchar(80) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock`(
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`ticker` varchar(6) NOT NULL,
	`date_recorded` date NOT NULL,
	`price_close` DECIMAL(8, 2),
	`companyID` int(11) NOT NULL,
	UNIQUE (companyID, date_recorded),
	PRIMARY KEY (`id`),
	FOREIGN KEY (`companyID`) REFERENCES `gaming_company` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `twitter`;
CREATE TABLE `twitter` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`date_recorded` date NOT NULL,
	`url` varchar(80),
	`buzz` int(20),
	`companyID` int(11) NOT NULL,
	UNIQUE (companyID, date_recorded),
	PRIMARY KEY (`id`),
	FOREIGN KEY (`companyID`) REFERENCES `gaming_company` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `game`;
CREATE TABLE `game` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`game_name` varchar(80) NOT NULL UNIQUE,
	`release_date` date,
	`rating` tinyint(3),
	`companyID` int(11) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`companyID`) REFERENCES `gaming_company` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `genre`;
CREATE TABLE `genre` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`category` varchar(40) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `game_genre`;
CREATE TABLE `game_genre` (
	`gameID` int(11) NOT NULL,
	`genreID` int(11) NOT NULL,
	PRIMARY KEY(`gameID`, `genreID`),
	FOREIGN KEY (`gameID`) REFERENCES `game` (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`genreID`) REFERENCES `genre` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Insert gaming companies
INSERT INTO `gaming_company` (comp_name) values ("Nintendo");
INSERT INTO `gaming_company` (comp_name) values ("EA");
INSERT INTO `gaming_company` (comp_name) values ("Activision");
INSERT INTO `gaming_company` (comp_name) values ("RockStar Games");

-- Insert stock prices
INSERT INTO `stock` (ticker, date_recorded, price_close, companyID) 
	VALUES ("NTDOY", "2018-10-5", 45.15, (
		SELECT id FROM gaming_company 
		WHERE comp_name = "Nintendo"	
	)
);
INSERT INTO `stock` (ticker, date_recorded, price_close, companyID) 
	VALUES ("EA", "2018-11-20", 82.27, (
		SELECT id FROM gaming_company 
		WHERE comp_name = "EA"	
	)
);
INSERT INTO `stock` (ticker, date_recorded, price_close, companyID) 
	VALUES ("ATVI", "2018-11-20", 49.06, (
		SELECT id FROM gaming_company 
		WHERE comp_name = "Activision"	
	)
);
INSERT INTO `stock` (ticker, date_recorded, price_close, companyID) 
	VALUES ("TTWO", "2018-11-20", 104.03, (
		SELECT id FROM gaming_company 
		WHERE comp_name = "RockStar Games"	
	)
);

-- Insert Twitters
INSERT INTO `twitter` (date_recorded, url, buzz, companyID) 
VALUES ("2018-10-11", "https://twitter.com/NintendoAmerica", 120825, (
	SELECT id FROM gaming_company 
		WHERE comp_name = "Nintendo"	
	)
); 
INSERT INTO `twitter` (date_recorded, url, buzz, companyID) 
VALUES ("2018-11-20", "https://twitter.com/EA", 23749, (
	SELECT id FROM gaming_company 
		WHERE comp_name = "EA"	
	)
); 
INSERT INTO `twitter` (date_recorded, url, buzz, companyID) 
VALUES ("2018-11-20", "https://twitter.com/Activision", 52365, (
	SELECT id FROM gaming_company 
		WHERE comp_name = "Activision"	
	)
); 
INSERT INTO `twitter` (date_recorded, url, buzz, companyID) 
VALUES ("2018-11-20", "https://twitter.com/rockstargames", 238055, (
	SELECT id FROM gaming_company 
		WHERE comp_name = "RockStar Games"	
	)
); 

-- Insert games
INSERT INTO `game` (game_name, release_date, rating, companyID) 
VALUES ("Super Mario Party", "2018-10-5", 2, (
		SELECT id FROM gaming_company 
		WHERE comp_name = "Nintendo"	
	)
);
INSERT INTO `game` (game_name, release_date, rating, companyID) 
VALUES ("Battlefield V", "2018-11-20", 10, (
		SELECT id FROM gaming_company 
		WHERE comp_name = "EA"	
	)
);
INSERT INTO `game` (game_name, release_date, rating, companyID) 
VALUES ("Call of Duty: WWII", "2018-11-20", 6, (
		SELECT id FROM gaming_company 
		WHERE comp_name = "Activision"	
	)
);
INSERT INTO `game` (game_name, release_date, rating, companyID) 
VALUES ("Grand Theft Auto: V", "2013-09-17", 6, (
		SELECT id FROM gaming_company 
		WHERE comp_name = "RockStar Games"	
	)
);

-- Insert genres
INSERT INTO `genre` (category) values ("Party");
INSERT INTO `genre` (category) values ("First Person Shooter");
INSERT INTO `genre` (category) values ("Action");
INSERT INTO `genre` (category) values ("Adventure");

-- Insert game_genre links
INSERT INTO `game_genre` (gameID, genreID) 
VALUES ((
		SELECT id FROM game
		WHERE game_name = "Super Mario Party"
	), 
	(
		SELECT id FROM genre
		WHERE category = "Party"
	)
);
INSERT INTO `game_genre` (gameID, genreID) 
VALUES ((
		SELECT id FROM game
		WHERE game_name = "Battlefield V"
	), 
	(
		SELECT id FROM genre
		WHERE category = "First Person Shooter"
	)
);
INSERT INTO `game_genre` (gameID, genreID) 
VALUES ((
		SELECT id FROM game
		WHERE game_name = "Call of Duty: WWII"
	), 
	(
		SELECT id FROM genre
		WHERE category = "First Person Shooter"
	)
);
INSERT INTO `game_genre` (gameID, genreID) 
VALUES ((
		SELECT id FROM game
		WHERE game_name = "Grand Theft Auto: V"
	), 
	(
		SELECT id FROM genre
		WHERE category = "Action"
	)
);
INSERT INTO `game_genre` (gameID, genreID) 
VALUES ((
		SELECT id FROM game
		WHERE game_name = "Grand Theft Auto: V"
	), 
	(
		SELECT id FROM genre
		WHERE category = "Adventure"
	)
);