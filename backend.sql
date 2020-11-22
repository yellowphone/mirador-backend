CREATE TABLE users (
    pkUser SERIAL PRIMARY KEY,
    email VARCHAR(64) UNIQUE NOT NULL,
	username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    firstname VARCHAR(50),
	lastname VARCHAR(50),
    bio VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE adventures (
    pkAdventure SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    summary VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_user_adventure INTEGER NOT NULL,
    CONSTRAINT author FOREIGN KEY(fk_user_adventure) REFERENCES users(pkUser)
    -- fk_location_adventure integer REFERENCES locations(pkLocation)

    -- image will be on bucket, link to that

);

CREATE TABLE blogs (
    pkBlog SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    summary VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_user_blog integer REFERENCES users(pkUser)
    -- content BYTEA
         
);

CREATE TABLE locations (
    pkLocation SERIAL PRIMARY KEY,
    lat DECIMAL(8, 6),
    lng DECIMAL(9, 6)
);

CREATE TABLE itineraries (
    pkItinerary SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL, 
    summary VARCHAR(255)

    -- foreign key to calendar/jumble/list format for planner
);

-- highlight must have a foreign key from user's pkUser when creating

-- user will have many intersection tables

-- SELECT * from post where userid == foreign key in posts