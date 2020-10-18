const { gql } = require('apollo-server');

const typeDefs = gql`
type Mutation {
    createUser(email: String!, name: String!): String!
}

type Query {
    findUser(email: String!): User!
    findManyUsers(name: String!): [User!]!
}

type User {
    id: Int!
    name: String!
    email : String
}
`;

module.exports = typeDefs;