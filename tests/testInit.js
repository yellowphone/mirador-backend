// const fetch = require('node-fetch')
// const { createHttpLink } = require('apollo-link-http')
// const { InMemoryCache } = require('apollo-cache-inmemory')
// const { ApolloClient } = require('apollo-client')

// const httpLink = createHttpLink({ 
//     uri: 'http://localhost:4000/graphql', 
//     fetch: fetch 
// });

// const client = new ApolloClient({
//     link: httpLink,
//     cache: new InMemoryCache(),
//     onError: (e) => { console.log(e) },
// });

// module.exports = {
//     client
// }

const { PrismaClient } = require('@prisma/client');
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./../schema');
const Query = require('./../resolvers/Query');
const Mutation = require('./../resolvers/Mutation')
const { GraphQLUpload } = require("apollo-server-express")
const prisma = new PrismaClient();

const resolvers = {
    Query,
    Mutation,
    Upload: GraphQLUpload,
}

const mocks = {
    String: () => 'test',
    Int: () => 2
}

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    mocks,
    context: ({ req }) => {
        return { prisma }
    }
})

const { createTestClient } = require('apollo-server-testing');

const { query, mutate } = createTestClient(server);

module.exports = {
    query, mutate
}