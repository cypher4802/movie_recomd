CREATE DATABASE CINESHEET;
USE CINESHEET;


CREATE TABLE USERS (
    user_id INT PRIMARY KEY,
    name VARCHAR(50),
    password_hash VARCHAR(50),
    email VARCHAR(50),
    mobile_no INT,
    profile_picture VARCHAR(255)
);


CREATE TABLE MOVIES (
    movie_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50),
    rating DECIMAL(3,1),
    runtime TIME,
    language CHAR(20)
);


CREATE TABLE GENRES (
    genre_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
);


CREATE TABLE PLATFORM (
    platform_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
);


CREATE TABLE FAVOURITES (
    favourite_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    movie_id INT,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id),
    FOREIGN KEY (movie_id) REFERENCES MOVIES(movie_id)
);


CREATE TABLE MOVIES_GENRES (
    movie_id INT,
    genre_id INT,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES MOVIES(movie_id),
    FOREIGN KEY (genre_id) REFERENCES GENRES(genre_id)
);


CREATE TABLE MOVIES_PLATFORMS (
    movie_id INT,
    platform_id INT,
    PRIMARY KEY (movie_id, platform_id),
    FOREIGN KEY (movie_id) REFERENCES MOVIES(movie_id),
    FOREIGN KEY (platform_id) REFERENCES PLATFORM(platform_id)
);








