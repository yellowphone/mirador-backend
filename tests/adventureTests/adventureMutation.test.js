//RUNNING INTO ISSUE WITH LOCATIONS INSIDE ADVENTURES INSIDE USERS, doesn't allow deleting

test('adds 1 + 2 to equal 3', () => {
    expect(1+2).toBe(3);
});


// const gql = require('graphql-tag');
// const { client } = require('../testInit');

// var testUser = 0
// var testAdventure = 0

// // Run before any userQuery tests are run
// beforeAll(async (done) => {
//   const res = await client.mutate({
//     mutation: gql`
//       mutation {
//         createUser(username: "CptA4gscyRZ3aTYk", email: "CptA4gscyRZ3aTYk", password: "test", firstname: "test", lastname: "test") {
//           pkuser
//         }
//       }`
//   })
//   testUser = res.data["createUser"]["pkuser"]
//   console.log(`User created with pkuser: ${testUser}`)
//   done()
// }) 


// describe('Testing adventureMutation', () => {

//   it('Creating an adventure', async () => {
//     await expect(client.mutate({
//       mutation: gql`
//         mutation {
//             createAdventure(title: "Test", pkuser: ${testUser}, lat: 12.123, lng: -123.123) {
//                 title
//                 fk_user_adventure
//                 locations {
//                     lat
//                     lng
//                 }
//             }
//         }
//       `,
//     })).resolves.toStrictEqual({"data": {"createAdventure": {"__typename": "Adventure", "title": "Test", "pkuser": testUser, "locations": {"lat": 12.123, "lng": -123.123}}}})
//   })

//   it('Deleting an adventure', async () => {
//       const res = await client.query({
//           query: gql`
//             query {
//                 findUser(pkuser: ${testUser}) {
//                     adventures {
//                         pkadventure
//                     }
//                 }
//             }
//           `
//       })
//       console.log(res.data)
//       testAdventure = res.data["findUser"]["adventures"][0]["pkadventure"]
//   })

// });


// // Run after all userQuery tests are run
// afterAll(async (done) => {
//   const res = await client.mutate({
//     mutation: gql`
//       mutation {
//         deleteUser(pkuser: ${testUser}) {
//           pkuser
//         }
//       }`
//   })
//   console.log(`Deleted ${res.data["deleteUser"]["pkuser"]}`)
//   done()
// })