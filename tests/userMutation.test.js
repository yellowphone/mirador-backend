const fetch = require('node-fetch')
const { createHttpLink } = require('apollo-link-http')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { ApolloClient } = require('apollo-client')
const gql = require('graphql-tag')

const httpLink = createHttpLink({ 
    uri: 'http://localhost:4000/graphql', 
    fetch: fetch 
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    onError: (e) => { console.log(e) },
});


// describe('Tests the createUser Mutation', () => {
//     it('a test ', async () => {
//     await expect(client.mutate({
//       mutation: gql`
//       mutation {
//         createUser(username: "geomin76") {
//           pkuser
//         }
//       }
//       `,
//     })).rejects.toThrowError("Need more fields!");
//   })
// });

describe('get users', () => {
    it('another test ', async () => {
    await expect(client.query({
      query: gql`
      query {
        findUser(pkuser: 1) {
          pkuser
          username
        }
      }
      `,
    })).resolves.toStrictEqual({"data": {"findUser": {"__typename": "User", "pkuser": 1, "username": "ge"}}, "loading": false, "networkStatus": 7, "stale": false})
  })
});