const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
scalar DateTime

type Mutation {
    createUser(email: String!, username: String!, password: String!, firstname: String!, lastname: String!): User!
    followUser(user_following: Int!, user_followed: Int!): Follower!
    unfollowUser(pkfollower: Int!): Follower!
    deleteUser(pkuser: Int!): User!
    createAdventure(title: String, pkuser: Int!, summary: String, miles: Float, elevation: Int, climbing: String, difficulty: Difficulty_Level, lat: Float!, lng: Float!, images: [Upload!], caption: String): Adventure!
    addImageToAdventure(images: [Upload!]!, pkadventure: Int!, caption: String, pkuser: Int!): String
    saveAdventure(saving_user: Int!, saving_adventure: Int!): Saved_Adventure!
    unsaveAdventure(pksaved_adventure: Int!): Saved_Adventure!
    visitAdventure(visiting_user: Int!, visiting_adventure: Int!): Visited_Adventure
    reviewAdventure(rating: Int!, content: String, review_user: Int!, review_adventure: Int!, images: [Upload!]): Review_Adventure
    deleteReviewAdventure(pkreview_adventure: Int!): Review_Adventure
    unvisitAdventure(pkvisited_adventure: Int!): Visited_Adventure
    deleteAdventure(pkadventure: Int!): Adventure!
    createBlog(title: String, pkuser: Int!, summary: String, content: String): Blog!
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
}

type Query {
    findUser(pkuser: Int!): User!
    findManyUsers(firstName: String!): [User!]!
    findAdventureById(pkadventure: Int!): Adventure
    findAdventureByCoordinates(lat: Float!, lng: Float!): [Location]
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
    adventures: [Adventure]
    blogs: [Blog]
    followers_followers_user_followedTousers: [Follower]
    followers_followers_user_followingTousers: [Follower]
    saved_adventures: [Saved_Adventure]
    visited_adventures: [Visited_Adventure]
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

type Adventure {
    pkadventure: Int!
    title: String!
    summary: String
    created_on: DateTime
    fk_user_adventure: Int!
    locations: Location
    miles: Float
    elevation: Int
    climbing: String
    difficulty: Difficulty_Level
    adventure_images: [Adventure_Image]
    review_adventures: [Review_Adventure]
}

enum Difficulty_Level {
    EASY
    MODERATE
    HARD
}

type Adventure_Image {
    pkadventure_image: Int!
    adding_adventure: Int!
    adding_image: Int!
    adventures: Adventure
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

type Saved_Adventure {
    pksaved_adventure: Int!
    created_on: DateTime
    saving_user: Int!
    saving_adventure: Int!
    adventures: Adventure
    users: User
}

type Visited_Adventure {
    pkvisited_adventure: Int!
    created_on: DateTime
    visiting_user: Int!
    visiting_adventure: Int!
    adventures: Adventure
    users: User
}

type Review_Adventure {
    pkreview_adventure: Int!
    rating: Int!
    content: String
    created_on: DateTime
    review_user: Int!
    review_adventure: Int!
    users: User
    adventures: Adventure
}

type Blog {
    pkblog: Int!
    title: String!
    summary: String
    content: String
    created_on: DateTime
    fk_user_blog: Int!
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

type Location {
    pklocation: Int!
    lat: Float
    lng: Float
    fk_adventure_location: Int!
    adventures: Adventure
    distance: Float
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
