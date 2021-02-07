'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();


const app = express();
app.use(cors())
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;


const { PrismaClient } = require('@prisma/client');
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation')
const { GraphQLUpload } = require("apollo-server-express")
const prisma = new PrismaClient();

const resolvers = {
    Query,
    Mutation,
    Upload: GraphQLUpload,
}

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({ req }) => {
        // you can console.log the req
        // for debugging purposes. req.body
        // is probably all you will need. 
        // anything else of the req is way too big
        return { prisma }
    }
})


server.applyMiddleware({ app });
app.listen(PORT, () => {
    console.log(
        `App listening on port ${PORT}\nVisit http://localhost:${PORT}/graphql for GraphQL playground.`
    );
})