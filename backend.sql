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

CREATE TABLE followers (
    pkFollower SERIAL PRIMARY KEY,
    user_following INTEGER NOT NULL,
    CONSTRAINT user_following FOREIGN KEY (user_following) REFERENCES users(pkUser),
    user_followed INTEGER NOT NULL,
    CONSTRAINT user_followed FOREIGN KEY (user_followed) REFERENCES users(pkUser),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE adventures (
    pkAdventure SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    summary VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_user_adventure INTEGER NOT NULL,
    CONSTRAINT author FOREIGN KEY(fk_user_adventure) REFERENCES users(pkUser)

    -- image will be on bucket, link to that

);

CREATE TABLE blogs (
    pkBlog SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    summary VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_user_blog INTEGER NOT NULL,
    CONSTRAINT author FOREIGN KEY(fk_user_blog) REFERENCES users(pkUser)
    -- content BYTEA
         
);

CREATE TABLE locations (
    pkLocation SERIAL PRIMARY KEY,
    lat DECIMAL(8, 6),
    lng DECIMAL(9, 6),
    fk_adventure_location INTEGER NOT NULL,
    CONSTRAINT place FOREIGN KEY(fk_adventure_location) REFERENCES adventures(pkAdventure)
);

CREATE TABLE itineraries (
    pkItinerary SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL, 
    summary VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    -- foreign key to calendar/jumble/list format for planner
);