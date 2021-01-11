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
    CONSTRAINT user_following FOREIGN KEY (user_following) REFERENCES users(pkUser),
    user_followed INTEGER NOT NULL,
    CONSTRAINT user_followed FOREIGN KEY (user_followed) REFERENCES users(pkUser),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create type difficulty_level as enum('EASY', 'MODERATE', 'HARD');

CREATE TABLE experiences (
    pkexperience SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    summary VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_user_experience INTEGER NOT NULL,
    CONSTRAINT author FOREIGN KEY(fk_user_experience) REFERENCES users(pkUser),
    miles FLOAT(2),
    elevation INTEGER,
    climbing VARCHAR(5), -- max could be 5.15a or something like that
    difficulty difficulty_level
);

CREATE TABLE saved_experiences(
    pksaved_experience SERIAL PRIMARY KEY,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    saving_user INTEGER NOT NULL,
    CONSTRAINT suser FOREIGN KEY (saving_user) REFERENCES users(pkUser),
    saving_experience INTEGER NOT NULL,
    CONSTRAINT sexperience FOREIGN KEY (saving_experience) REFERENCES experiences(pkexperience)
);

CREATE TABLE visited_experiences(
    pkvisited_experience SERIAL PRIMARY KEY,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    visiting_user INTEGER NOT NULL,
    CONSTRAINT vuser FOREIGN KEY (visiting_user) REFERENCES users(pkUser),
    visiting_experience INTEGER NOT NULL,
    CONSTRAINT vexperience FOREIGN KEY (visiting_experience) REFERENCES experiences(pkexperience)
);

CREATE TABLE review_experiences(
    pkreview_experience SERIAL PRIMARY KEY,
    rating INT NOT NULL,
    content VARCHAR(750),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    review_user INTEGER NOT NULL,
    CONSTRAINT ruser FOREIGN KEY(review_user) REFERENCES users(pkUser),
    review_experience INTEGER NOT NULL,
    CONSTRAINT rexperience FOREIGN KEY(review_experience) REFERENCES experiences(pkexperience)
);

CREATE TABLE blogs (
    pkBlog SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    summary VARCHAR(255),
    content JSON,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_user_blog INTEGER NOT NULL,
    CONSTRAINT author FOREIGN KEY(fk_user_blog) REFERENCES users(pkUser)
);

CREATE TABLE saved_blogs(
    pksaved_blog SERIAL PRIMARY KEY,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    saving_user INTEGER NOT NULL,
    CONSTRAINT suser FOREIGN KEY (saving_user) REFERENCES users(pkUser),
    saving_blog INTEGER NOT NULL,
    CONSTRAINT sblog FOREIGN KEY (saving_blog) REFERENCES blogs(pkBlog)
);

CREATE TABLE liked_blogs(
    pkliked_blog SERIAL PRIMARY KEY,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    liking_user INTEGER NOT NULL,
    CONSTRAINT luser FOREIGN KEY (liking_user) REFERENCES users(pkUser),
    liking_blog INTEGER NOT NULL,
    CONSTRAINT lblog FOREIGN KEY (liking_blog) REFERENCES blogs(pkBlog)
);

CREATE TABLE comment_blogs(
    pkcomment_blog SERIAL PRIMARY KEY,
    comment VARCHAR(1000),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comment_user INTEGER NOT NULL,
    CONSTRAINT cuser FOREIGN KEY (comment_user) REFERENCES users(pkUser),
    comment_blog INTEGER NOT NULL,
    CONSTRAINT cblog FOREIGN KEY (comment_blog) REFERENCES blogs(pkBlog)
);

CREATE TABLE locations (
    pkLocation SERIAL PRIMARY KEY,
    lat DECIMAL(8, 6),
    lng DECIMAL(9, 6),
    fk_experience_location INTEGER NOT NULL UNIQUE,
    CONSTRAINT place FOREIGN KEY(fk_experience_location) REFERENCES experiences(pkexperience)
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
    CONSTRAINT suser FOREIGN KEY (saving_user) REFERENCES users(pkUser),
    saving_itinerary INTEGER NOT NULL,
    CONSTRAINT sitineraries FOREIGN KEY (saving_itinerary) REFERENCES itineraries(pkItinerary)
);

CREATE TABLE user_itineraries (
    pkuser_itinerary SERIAL PRIMARY KEY,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    adding_user INTEGER NOT NULL,
    CONSTRAINT auser FOREIGN KEY (adding_user) REFERENCES users(pkUser),
    adding_itinerary INTEGER NOT NULL,
    CONSTRAINT aitinerary FOREIGN KEY (adding_itinerary) REFERENCES itineraries(pkItinerary)
);

CREATE TABLE images (
    pkimage SERIAL PRIMARY KEY,
    identifier VARCHAR(200) NOT NULL UNIQUE,
    url VARCHAR(512) NOT NULL UNIQUE,
    caption VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_user_image INTEGER NOT NULL,
    CONSTRAINT author FOREIGN KEY(fk_user_image) REFERENCES users(pkUser)
);

CREATE TABLE experience_images (
    pkexperience_image SERIAL PRIMARY KEY,
    adding_experience INTEGER NOT NULL,
    CONSTRAINT aexperience FOREIGN KEY (adding_experience) REFERENCES experiences(pkexperience),
    adding_image INTEGER NOT NULL,
    CONSTRAINT aimage FOREIGN KEY (adding_image) REFERENCES images(pkimage)
);