-- RUN THESE COMMANDS IN UR SQL DB
create database twitterBot;
GRANT ALL PRIVILEGES ON twitterBot.* TO 'raptor'@'localhost';
FLUSH PRIVILEGES;
USE twitterBot;
-- TABLES
CREATE TABLE threads(
    name VARCHAR(96),
    threadID VARCHAR(96) UNIQUE KEY,
    thread MEDIUMTEXT
);
/* CREATE TABLE processState( */
/*     botName VARCHAR(96) UNIQUE KEY, */
/*     threadID VARCHAR(96) */
/* ); */
CREATE TABLE processPool(
    threadID VARCHAR(96) UNIQUE KEY,
    time INT(11)
);
CREATE TABLE bots(
    botName VARCHAR(96) UNIQUE KEY,
    lastSeen INT(11)
);
