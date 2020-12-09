DROP SCHEMA public CASCADE;
CREATE SCHEMA public;


CREATE TABLE users (
    pkUser SERIAL PRIMARY KEY,
    email VARCHAR(64) UNIQUE NOT NULL,
	username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
	lastname VARCHAR(50) NOT NULL,
    bio VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE followers (
    pkFollower SERIAL PRIMARY KEY,
    user_following INTEGER NOT NULL,
    CONSTRAINT user_following FOREIGN KEY (user_following) REFERENCES users(pkUser) ON DELETE CASCADE,
    user_followed INTEGER NOT NULL,
    CONSTRAINT user_followed FOREIGN KEY (user_followed) REFERENCES users(pkUser) ON DELETE CASCADE,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create type difficulty_level as enum('EASY', 'MODERATE', 'HARD');

CREATE TABLE adventures (
    pkAdventure SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    summary VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_user_adventure INTEGER NOT NULL,
    CONSTRAINT author FOREIGN KEY(fk_user_adventure) REFERENCES users(pkUser) ON DELETE CASCADE,
    miles FLOAT(2),
    elevation INTEGER,
    climbing VARCHAR(5), -- max could be 5.15a or something like that
    difficulty difficulty_level
);

CREATE TABLE saved_adventures(
    pksaved_adventure SERIAL PRIMARY KEY,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    saving_user INTEGER NOT NULL,
    CONSTRAINT suser FOREIGN KEY (saving_user) REFERENCES users(pkUser) ON DELETE CASCADE,
    saving_adventure INTEGER NOT NULL,
    CONSTRAINT sadventure FOREIGN KEY (saving_adventure) REFERENCES adventures(pkAdventure) ON DELETE CASCADE
);

CREATE TABLE visited_adventures(
    pkvisited_adventure SERIAL PRIMARY KEY,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    visiting_user INTEGER NOT NULL,
    CONSTRAINT vuser FOREIGN KEY (visiting_user) REFERENCES users(pkUser) ON DELETE CASCADE,
    visiting_adventure INTEGER NOT NULL,
    CONSTRAINT vadventure FOREIGN KEY (visiting_adventure) REFERENCES adventures(pkAdventure) ON DELETE CASCADE
);

CREATE TABLE blogs (
    pkBlog SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    summary VARCHAR(255),
    content VARCHAR,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_user_blog INTEGER NOT NULL,
    CONSTRAINT author FOREIGN KEY(fk_user_blog) REFERENCES users(pkUser) ON DELETE CASCADE
);

CREATE TABLE saved_blogs(
    pksaved_blog SERIAL PRIMARY KEY,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    saving_user INTEGER NOT NULL,
    CONSTRAINT suser FOREIGN KEY (saving_user) REFERENCES users(pkUser) ON DELETE CASCADE,
    saving_blog INTEGER NOT NULL,
    CONSTRAINT sblog FOREIGN KEY (saving_blog) REFERENCES blogs(pkBlog) ON DELETE CASCADE
);

CREATE TABLE liked_blogs(
    pkliked_blog SERIAL PRIMARY KEY,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    liking_user INTEGER NOT NULL,
    CONSTRAINT luser FOREIGN KEY (liking_user) REFERENCES users(pkUser) ON DELETE CASCADE,
    liking_blog INTEGER NOT NULL,
    CONSTRAINT lblog FOREIGN KEY (liking_blog) REFERENCES blogs(pkBlog) ON DELETE CASCADE
);

CREATE TABLE locations (
    pkLocation SERIAL PRIMARY KEY,
    lat DECIMAL(8, 6),
    lng DECIMAL(9, 6),
    fk_adventure_location INTEGER NOT NULL UNIQUE,
    CONSTRAINT place FOREIGN KEY(fk_adventure_location) REFERENCES adventures(pkAdventure) ON DELETE CASCADE
);

CREATE TABLE itineraries (
    pkItinerary SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL, 
    summary VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    -- foreign key to calendar/jumble/list format for planner
);

CREATE TABLE saved_itineraries(
    pksaved_itinerary SERIAL PRIMARY KEY,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    saving_user INTEGER NOT NULL,
    CONSTRAINT suser FOREIGN KEY (saving_user) REFERENCES users(pkUser) ON DELETE CASCADE,
    saving_itinerary INTEGER NOT NULL,
    CONSTRAINT sitineraries FOREIGN KEY (saving_itinerary) REFERENCES itineraries(pkItinerary) ON DELETE CASCADE
);

CREATE TABLE user_itineraries (
    pkuser_itinerary SERIAL PRIMARY KEY,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    adding_user INTEGER NOT NULL,
    CONSTRAINT auser FOREIGN KEY (adding_user) REFERENCES users(pkUser) ON DELETE CASCADE,
    adding_itinerary INTEGER NOT NULL,
    CONSTRAINT aitinerary FOREIGN KEY (adding_itinerary) REFERENCES itineraries(pkItinerary) ON DELETE CASCADE
);

CREATE TABLE images (
    pkimage SERIAL PRIMARY KEY,
    identifier VARCHAR(200) NOT NULL UNIQUE,
    url VARCHAR(512) NOT NULL UNIQUE,
    caption VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_user_image INTEGER NOT NULL,
    CONSTRAINT author FOREIGN KEY(fk_user_image) REFERENCES users(pkUser) ON DELETE CASCADE
);

CREATE TABLE adventure_images (
    pkadventure_image SERIAL PRIMARY KEY,
    adding_adventure INTEGER NOT NULL,
    CONSTRAINT aadventure FOREIGN KEY (adding_adventure) REFERENCES adventures(pkAdventure) ON DELETE CASCADE,
    adding_image INTEGER NOT NULL,
    CONSTRAINT aimage FOREIGN KEY (adding_image) REFERENCES images(pkimage) ON DELETE CASCADE
);