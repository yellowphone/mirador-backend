const { gql } = require('apollo-server');

const typeDefs = gql`
type Mutation {
    createUser(
        email: String!, 
        username: String!, 
        firstname: String, 
        lastname: String
        ): String!
}

type Query {
    findUser(username: String!): User!
    findManyUsers(firstname: String!): [User!]!
}

type User {
    id: Int!
    username: String!
    email: String!
    firstname: String
    lastname : String
}
`;

module.exports = typeDefs;