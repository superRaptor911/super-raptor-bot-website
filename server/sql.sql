-- RUN THESE COMMANDS IN UR SQL DB
create database twitterBot;
GRANT ALL PRIVILEGES ON twitterBot.* TO 'vyshnav'@'localhost';
FLUSH PRIVILEGES;
USE twitterBot;
-- TABLES
DROP TABLE IF EXISTS threads;
CREATE TABLE threads(
    name VARCHAR(96),
    threadID VARCHAR(96) UNIQUE KEY,
    title VARCHAR(64),
    thread MEDIUMTEXT
);
DROP TABLE IF EXISTS processPool;
CREATE TABLE processPool(
    threadID VARCHAR(96) UNIQUE KEY,
    time INT(11)
);
DROP TABLE IF EXISTS bots;
CREATE TABLE bots(
    botName VARCHAR(96) UNIQUE KEY,
    lastSeen INT(11)
);
