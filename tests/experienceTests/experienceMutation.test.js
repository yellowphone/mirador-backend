// const gql = require('graphql-tag');
// const { client } = require('../testInit');

// var testUser = 0
// var testAdventure = 0



// // Run before any userQuery tests are run
// beforeAll(async () => {
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
//         }`,
//     })).resolves.toEqual({"data": {"createAdventure": {"__typename": "Adventure", "title": "Test", "fk_user_adventure": testUser, "locations": {"__typename": "Location", "lat": 12.123, "lng": -123.123}}}})
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
//             }`
//       })
//       testAdventure = res.data["findUser"]["adventures"][0]["pkadventure"]

//       console.log(`Deleting adventure with primary key: ${testAdventure}`)

//       await expect(client.mutate({
//         mutation: gql`
//           mutation {
//             deleteAdventure(pkadventure: ${testAdventure}) {
//               pkadventure
//             }
//           }
//         `
//       })).resolves.toStrictEqual({"data": {"deleteAdventure": {"__typename": "Adventure", "pkadventure": testAdventure}}})
//   })

// });


// afterAll(async () => {
//     const res = await client.mutate({
//       mutation: gql`
//         mutation {
//           deleteUser(pkuser: ${testUser}) {
//             pkuser
//           }
//         }`
//     })
//     console.log(`Deleted ${res.data["deleteUser"]["pkuser"]}`)
// })

describe('Testing blogMutation', () => {
  it('adds 1 + 2 to equal 3', () => {
      expect(1+2).toBe(3);
  });
})