const gql = require('graphql-tag');
const { client } = require('../testInit');

// beforeAll() 

// afterAll()

describe('Testing userQuery', () => {
    it('Finding a finding ', async () => {
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