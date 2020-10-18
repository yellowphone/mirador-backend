'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000'}));
const PORT = process.env.PORT || 3000;


const { PrismaClient } = require('@prisma/client');
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation')
const prisma = new PrismaClient();

const resolvers = {
    Query,
    Mutation
}

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({ req }) => {
        return { prisma }
    }
})


server.applyMiddleware({ app });
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})