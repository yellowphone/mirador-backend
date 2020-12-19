const gql = require('graphql-tag');
const { client } = require('../testInit');

var pkuserToDelete = 0

// Run before any userQuery tests are run
beforeAll(async (done) => {
  const res = await client.mutate({
    mutation: gql`
      mutation {
        createUser(username: "CptA4gscyRZ3aTYk", email: "CptA4gscyRZ3aTYk", password: "test", firstname: "test", lastname: "test") {
          pkuser
        }
      }`
  })
  pkuserToDelete = res.data["createUser"]["pkuser"]
  console.log(`User created with pkuser: ${pkuserToDelete}`)
  done()
}) 


describe('Testing userQuery', () => {

  it('Finding a finding user by primary key', async () => {
    await expect(client.query({
      query: gql`
        query {
          findUser(pkuser: ${pkuserToDelete}) {
            pkuser
            username
          }
        }
      `,
    })).resolves.toStrictEqual({"data": {"findUser": {"__typename": "User", "pkuser": pkuserToDelete, "username": "CptA4gscyRZ3aTYk"}}, "loading": false, "networkStatus": 7, "stale": false})
  }, 30000)

  it('Finding a finding user by username', async () => {
    await expect(client.query({
      query: gql`
        query {
          findUserByUsername(username: "CptA4gscyRZ3aTYk") {
            pkuser
          }
        }`,
    })).resolves.toStrictEqual({"data": {"findUserByUsername": {"__typename": "User", "pkuser": pkuserToDelete}}, "loading": false, "networkStatus": 7, "stale": false})
  }, 30000)

});


// Run after all userQuery tests are run
afterAll(async (done) => {
  const res = await client.mutate({
    mutation: gql`
      mutation {
        deleteUser(pkuser: ${pkuserToDelete}) {
          pkuser
        }
      }`
  })
  console.log(`Deleted ${res.data["deleteUser"]["pkuser"]}`)
  done()
})