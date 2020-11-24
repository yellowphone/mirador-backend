const { gql } = require('apollo-server');

const typeDefs = gql`
type Mutation {
    createUser(email: String!, username: String!, password: String!, firstname: String, lastname: String): User!
    deleteUser(pkuser: Int!): User!
    createAdventure(title: String, pkuser: Int!, lat: Float!, lng: Float!): Adventure!
    deleteAdventure(pkadventure: Int!): Adventure!
    createBlog(title: String, pkuser: Int!): String!
    deleteBlog(pkblog: Int!): Blog!
    createItinerary(title: String): Itinerary!
    deleteItinerary(pkitinerary: Int!): Itinerary!
}

type Query {
    findUser(pkuser: Int!): User!
    findManyUsers(firstName: String!): [User!]!
    findAdventureByUser(pkuser: Int!): [Adventure]
    findAdventureById(pkadventure: Int!): Adventure
    findBlogByUser(pkuser: Int!): [Blog]
    findItineraryById(pkitinerary: Int!): Itinerary
}

type User {
    pkUser: Int!
    username: String!
    email: String!
    password: String!
    firstname: String
    lastname : String
    bio: String
    adventures: [Adventure]
    blogs: [Blog]
}

type Adventure {
    pkAdventure: Int!
    title: String!
    summary: String
    fk_user_adventure: Int!
    locations: [Location]
}

type Blog {
    pkBlog: Int!
    title: String!
    summary: String
    fk_user_blog: Int!
}

type Location {
    pkLocation: Int!
    lat: Float
    lng: Float
    fk_adventure_location: Int!
}

type Itinerary {
    pkItinerary: Int!
    title: String!
    summary: String
}
`;

module.exports = typeDefs;