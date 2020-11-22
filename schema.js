const { gql } = require('apollo-server');

const typeDefs = gql`
type Mutation {
    createUser(email: String!, username: String!, password: String!, firstname: String, lastname: String): String!
    createAdventure(title: String, username: String!): String!
}

type Query {
    findUser(username: String!): User!
    findManyUsers(firstName: String!): [User!]!
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
}

type Adventure {
    pkAdventure: Int!
    title: String!
    summary: String
    fk_user_adventure: Int!
}

type Blog {
    pkBlog: Int!
    title: String!
    summary: String
}

type Location {
    pkLocation: Int!
}

type Itinerary {
    pkItinerary: Int!
    title: String!
    summary: String
}
`;

module.exports = typeDefs;