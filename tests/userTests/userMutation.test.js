const gql = require('graphql-tag');
const { client } = require('../testInit');

// afterAll()

describe('Testing userMutation', () => {

  it('Creating a user', async () => {
    await expect(client.mutate({
      mutation: gql`
        mutation {
          createUser(username: "CptA4gscyRZ3aTYk", email: "CptA4gscyRZ3aTYk", password: "test", firstname: "test", lastname: "test") {
            username
          }
        }
      `,
    })).resolves.toStrictEqual({"data": {"createUser": {"__typename": "User", "username": "CptA4gscyRZ3aTYk"}}})
  }, 30000)

  it('Deleting a user', async () => {
    //Find primary key for test user to delete
    const res = await client.query({
      query: gql`
        query {
          findUserByUsername(username: "CptA4gscyRZ3aTYk") {
            pkuser
          }
        }`
    })
    const pkuserToDelete = res.data["findUserByUsername"]["pkuser"]

    // Testing deleteUser
    await expect(client.mutate({
      mutation: gql`
        mutation {
          deleteUser(pkuser: ${pkuserToDelete}) {
            pkuser
            username
          }
        }
      `,
    })).resolves.toStrictEqual({"data": {"deleteUser": {"__typename": "User", "pkuser": pkuserToDelete,"username": "CptA4gscyRZ3aTYk"}}})

  }, 30000)

  // NEED A BETTER RESPONSE FROM ERROR
  // it('No duplicates of username', async () => {
  //   await expect(client.mutate({
  //     mutation: gql`
  //     mutation {
  //       createUser(username: "CptA4gscyRZ3aTYk") {
  //         pkuser
  //       }
  //     }
  //     `,
  //   })).rejects.toThrowError("Network error: Response not successful: Received status code 400");
  // })

  // it('No duplicates of email', async () => {
  //   await expect(client.mutate({
  //     mutation: gql`
  //     mutation {
  //       createUser(email: "CptA4gscyRZ3aTYk") {
  //         pkuser
  //       }
  //     }
  //     `,
  //   })).rejects.toThrowError("Network error: Response not successful: Received status code 400");
  // })

});

// NEED TO MAKE SURE THERE IS NO USER WITH USERNAME IN AFTERALL PART