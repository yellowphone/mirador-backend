const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
scalar DateTime
scalar Json

type Mutation {
    createUser(email: String!, username: String!, password: String!, firstname: String!, lastname: String!): User!
    followUser(user_following: Int!, user_followed: Int!): Follower!
    unfollowUser(pkfollower: Int!): Follower!
    deleteUser(pkuser: Int!): User!
    createExperience(title: String, pkuser: Int!, summary: String, miles: Float, elevation: Int, climbing: String, difficulty: Difficulty_Level, lat: Float!, lng: Float!, images: [Upload!], caption: String): Experience!
    addImageToExperience(images: [Upload!]!, pkexperience: Int!, caption: String, pkuser: Int!): String
    saveExperience(saving_user: Int!, saving_experience: Int!): Saved_Experience!
    unsaveExperience(pksaved_experience: Int!): Saved_Experience!
    visitExperience(visiting_user: Int!, visiting_experience: Int!): Visited_Experience
    reviewExperience(rating: Int!, content: String, review_user: Int!, review_experience: Int!, images: [Upload!]): Review_Experience
    deleteReviewExperience(pkreview_experience: Int!): Review_Experience
    unvisitExperience(pkvisited_experience: Int!): Visited_Experience
    deleteExperience(pkexperience: Int!): Experience!
    createBlog(title: String, pkuser: Int!, summary: String, content: Json, lat: Float!, lng: Float!): Blog!
    saveBlog(saving_user: Int!, saving_blog: Int!): Saved_Blog
    unsaveBlog(pksaved_blog: Int!): Saved_Blog
    likeBlog(liking_user: Int!, liking_blog: Int!): Liked_Blog
    unlikeBlog(pkliked_blog: Int!): Liked_Blog
    commentBlog(comment: String!, pkuser: Int!, pkblog: Int!): Comment_Blog
    deleteCommentBlog(pkcomment_blog: Int!): Comment_Blog
    deleteBlog(pkblog: Int!): Blog!
    createItinerary(title: String, summary: String): Itinerary!
    saveItinerary(saving_user: Int!, saving_itinerary: Int!): Saved_Itinerary
    unsaveItinerary(pksaved_itinerary: Int!): Saved_Itinerary
    addUserToItinerary(adding_user: Int!, adding_itinerary: Int!): User_Itinerary!
    deleteUserFromItinerary(pkuser_itinerary: Int!): Itinerary
    deleteItinerary(pkitinerary: Int!): Itinerary!
    createImage(pkuser: Int!, caption: String, file: Upload!): Image
}

type Query {
    findUser(pkuser: Int!): User!
    findUserByUsername(username: String!): User!
    findManyUsers(firstName: String!): [User!]!
    findExperienceById(pkexperience: Int!): Experience
    findExperienceByTitle(title: String!): [Experience]
    findExperienceByCoordinates(lat: Float!, lng: Float!): [Experience_Card]
    findBlogById(pkblog: Int!): Blog
    findItineraryById(pkitinerary: Int!): Itinerary
}

type User {
    pkuser: Int!
    username: String!
    email: String!
    password: String!
    firstname: String
    lastname : String
    bio: String
    created_on: DateTime
    experiences: [Experience]
    blogs: [Blog]
    followers_followers_user_followedTousers: [Follower]
    followers_followers_user_followingTousers: [Follower]
    saved_experiences: [Saved_Experience]
    visited_experiences: [Visited_Experience]
    user_itineraries: [User_Itinerary]
    saved_blogs: [Saved_Blog]
    saved_itineraries: [Saved_Itinerary]
    liked_blogs: [Liked_Blog]
}

type Follower {
    pkfollower: Int!
    user_following: Int!
    user_followed: Int!
    created_on: DateTime
    users_followers_user_followedTousers: User
    users_followers_user_followingTousers: User
}

type Experience {
    pkexperience: Int!
    title: String!
    summary: String
    created_on: DateTime
    fk_user_experience: Int!
    experience_locations: Experience_Location
    miles: Float
    elevation: Int
    climbing: String
    difficulty: Difficulty_Level
    experience_images: [Experience_Image]
    review_experiences: [Review_Experience]
}

enum Difficulty_Level {
    EASY
    MODERATE
    HARD
}

type Experience_Image {
    pkexperience_image: Int!
    adding_experience: Int!
    adding_image: Int!
    experiences: Experience
    images: Image
}

type Image {
    pkimage: Int!
    identifier: String!
    url: String!
    caption: String
    created_on: DateTime
    fk_user_image: Int
    users: User
}

type Saved_Experience {
    pksaved_experience: Int!
    created_on: DateTime
    saving_user: Int!
    saving_experience: Int!
    experiences: Experience
    users: User
}

type Visited_Experience {
    pkvisited_experience: Int!
    created_on: DateTime
    visiting_user: Int!
    visiting_experience: Int!
    experiences: Experience
    users: User
}

type Review_Experience {
    pkreview_experience: Int!
    rating: Int!
    content: String
    created_on: DateTime
    review_user: Int!
    review_experience: Int!
    users: User
    experiences: Experience
}

type Blog {
    pkblog: Int!
    title: String!
    summary: String
    content: Json 
    created_on: DateTime
    fk_user_blog: Int!
    blog_locations: Blog_Location
    comment_blogs: [Comment_Blog]
    liked_blogs: [Liked_Blog]
    saved_blogs: [Saved_Blog]
}

type Saved_Blog {
    pksaved_blog: Int!
    created_on: DateTime
    saving_user: Int!
    saving_blog: Int!
    blogs: Blog
    users: User
}

type Liked_Blog {
    pkliked_blog: Int!
    created_on: DateTime
    liking_user: Int!
    liking_blog: Int!
    blogs: Blog
    users: User
}

type Comment_Blog {
    pkcomment_blog: Int!
    comment: String
    created_on: DateTime
    comment_user: Int!
    comment_blog: Int!
    blogs: Blog
    users: User
}

type Experience_Location {
    pkexperience_location: Int!
    lat: Float
    lng: Float
    fk_experience_location: Int!
    experiences: Experience
    distance: Float
}

type Blog_Location {
    pkblog_location: Int!
    lat: Float
    lng: Float
    fk_blog_location: Int!
    blogs: Blog
    distance: Float
}

type Itinerary_Location {
    pkitinerary_location: Int!
    lat: Float
    lng: Float
    fk_itinerary_location: Int!
    itineraries: Itinerary
    distance: Float
}

type Experience_Card {
    lat: Float
    lng: Float
    fk_experience_location: Int!
    distance: Float
    title: String
    summary: String
    created_on: DateTime
    miles: Float
    elevation: Int
    climbing: String
    difficulty: Difficulty_Level
}

type Itinerary {
    pkitinerary: Int!
    title: String!
    summary: String
    created_on: DateTime
    user_itineraries: [User_Itinerary]
}

type Saved_Itinerary {
    pksaved_itinerary: Int!
    created_on: DateTime
    saving_user: Int!
    saving_itinerary: Int!
    itineraries: Itinerary
    users: User
}

type User_Itinerary {
    pkuser_itinerary: Int!
    created_on: DateTime
    adding_user: Int!
    adding_itinerary: Int!
    itineraries: Itinerary
    users: User
}
`;

module.exports = typeDefs;
