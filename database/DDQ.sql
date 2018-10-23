-- Kevin Harvell and Will Darnell - 340 - Step 2 DDQ

DROP TABLE IF EXISTS `gaming_company`;
CREATE TABLE `gaming_company`(
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`comp_name` varchar(80) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock`(
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`ticker` varchar(6) NOT NULL,
	`date` date NOT NULL,
	`price_close` DECIMAL(8, 2),
	`companyID` int(11) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`companyID`) REFERENCES `gaming_company` (`id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `twitter`;
CREATE TABLE `twitter` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`date` date NOT NULL,
	`url` varchar(80),
	`buzz` int(20),
	`companyID` int(11) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`companyID`) REFERENCES `gaming_company` (`id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `game`;
CREATE TABLE `game` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`game_name` varchar(80) NOT NULL,
	`release_date` date,
	`rating` tinyint(3),
	`companyID` int(11) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`companyID`) REFERENCES `gaming_company` (`id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `genre`;
CREATE TABLE `genre` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`category` varchar(40) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `game_genre`;
CREATE TABLE `game_genre` (
	`gameID` int(11) NOT NULL,
	`genreID` int(11) NOT NULL,
	FOREIGN KEY (`gameID`) REFERENCES `game` (`id`),
	FOREIGN KEY (`genreID`) REFERENCES `genre` (`id`)
) ENGINE=InnoDB;


INSERT INTO `gaming_company` (comp_name) values ("Nintendo");
INSERT INTO `stock` (ticker, date, price_close, companyID)v menalues ("NTDOY", "2018-10-5", 45.15, 1);
INSERT INTO `twitter` (date, url, buzz, companyID) values ("2018-10-11", "https://twitter.com/NintendoAmerica", 120825, 1); 
INSERT INTO `game` (game_name, release_date, rating, companyID) values ("Super Mario Party", "2018-10-5", 2, 1);
INSERT INTO `genre` (category) values ("Party");
INSERT INTO `game_genre` (gameID, genreID) values (1, 1);