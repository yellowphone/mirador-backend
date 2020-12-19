const fetch = require('node-fetch')
const { createHttpLink } = require('apollo-link-http')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { ApolloClient } = require('apollo-client')

const httpLink = createHttpLink({ 
    uri: 'http://localhost:4000/graphql', 
    fetch: fetch 
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    onError: (e) => { console.log(e) },
});

module.exports = {
    client
}