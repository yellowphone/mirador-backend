const { gql } = require('apollo-server');

const typeDefs = gql`
type Mutation {
    createUser(
        email: String!, 
        username: String!, 
        firstName: String, 
        lastName: String
        ): String!
}

type Query {
    findUser(username: String!): User!
    findManyUsers(firstName: String!): [User!]!
}

type User {
    pkUser: Int!
    username: String!
    email: String!
    firstName: String
    lastName : String
}

type Adventure {
    pkAdventure: Int!
    title: String!
    summary: String
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