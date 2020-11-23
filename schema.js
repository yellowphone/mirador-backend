const { gql } = require('apollo-server');

const typeDefs = gql`
type Mutation {
    createUser(email: String!, username: String!, password: String!, firstname: String, lastname: String): User!
    deleteUser(pkuser: Int!): User!
    createAdventure(title: String, pkuser: Int!): String!
    deleteAdventure(pkadventure: Int!): Adventure!
    createBlog(title: String, pkuser: Int!): String!
    deleteBlog(pkblog: Int!): Blog!
}

type Query {
    findUser(pkuser: Int!): User!
    findManyUsers(firstName: String!): [User!]!
    findAdventureByUser(pkuser: Int!): [Adventure]
    findBlogByUser(pkuser: Int!): [Blog]
}

type User {
    pkuser: Int!
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
    pkadventure: Int!
    title: String!
    summary: String
    fk_user_adventure: Int!
}

type Blog {
    pkblog: Int!
    title: String!
    summary: String
    fk_user_blog: Int!
}

type Location {
    pklocation: Int!
    lat: Int!
    lng: Int!
}

type Itinerary {
    pkitinerary: Int!
    title: String!
    summary: String
}
`;

module.exports = typeDefs;