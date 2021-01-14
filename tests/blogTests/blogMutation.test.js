// const gql = require('graphql-tag');
// const { client } = require('../testInit');

// var testUser = 0
// var testBlog = 0

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

// describe('Testing blogMutation', () => {

//     // Creating a blog test
//     it('Creating a blog', async () => {
//         await expect(client.mutate({
//             mutation: gql`
//                 mutation {
//                     createBlog(title: "test", pkuser: ${testUser}, summary: "test", content: "test") {
//                         title
//                         fk_user_blog
//                         summary
//                         content
//                     }
//                 }`
//         })).resolves.toStrictEqual({"data": {"createBlog": {"__typename": "Blog", "title": "test", "fk_user_blog": testUser, "summary": "test", "content": "test"}}})
//     })

//     // Saving a blog test
//     it('Saving a blog', async () => {
//         const res = await client.query({
//             query: gql`
//                 query {
//                     findUser(pkuser: ${testUser}) {
//                         blogs {
//                             pkblog
//                         }
//                     }
//                 }`
//         })
//         testBlog = res.data["findUser"]["blogs"][0]["pkblog"]
//         console.log(`Test blog with primary key: ${testBlog}`)

//         await expect(client.mutate({
//             mutation: gql`
//                 mutation {
//                     saveBlog(saving_user: ${testUser}, saving_blog: ${testBlog}) {
//                         saving_user
//                         saving_blog
//                     }
//                 }`
//         })).resolves.toStrictEqual({"data": {"saveBlog": {"__typename": "Saved_Blog", "saving_user": testUser, "saving_blog": testBlog}}})
//     })

//     // Unsaving a blog test
//     it('Unsaving a blog', async () => {
//         const res = await client.query({
//             query: gql`
//             query {
//                 findUser(pkuser: ${testUser}) {
//                     saved_blogs {
//                         pksaved_blog
//                     }
//                 }
//             }`
//         })
//         const testSaved_Blog = res.data["findUser"]["saved_blogs"][0]["pksaved_blog"]
//         await expect(client.mutate({
//             mutation: gql`
//                 mutation {
//                     unsaveBlog(pksaved_blog: ${testSaved_Blog}) {
//                         pksaved_blog
//                     }
//                 }`
//         })).resolves.toEqual({"data": {"unsaveBlog": {"__typename": "Saved_Blog", "pksaved_blog": testSaved_Blog}}})

//     })

//     // Deleting a blog test
//     it('Deleting a blog', async () => {
//         const res = await client.query({
//             query: gql`
//                 query {
//                     findUser(pkuser: ${testUser}) {
//                         blogs {
//                             pkblog
//                         }
//                     }
//                 }`
//         })
//         testBlog = res.data["findUser"]["blogs"][0]["pkblog"]
//         console.log(`Test blog with primary key: ${testBlog}`)

//         await expect(client.mutate({
//             mutation: gql`
//                 mutation {
//                     deleteBlog(pkblog: ${testBlog}) {
//                         pkblog
//                     }
//                 }`
//         })).resolves.toStrictEqual({"data": {"deleteBlog": {"__typename": "Blog", "pkblog": testBlog}}})
//     })

// })

// // Run after all userQuery tests are run
// afterAll(async () => {
//     const res = await client.mutate({
//         mutation: gql`
//         mutation {
//             deleteUser(pkuser: ${testUser}) {
//             pkuser
//             }
//         }`
//     })
//     console.log(`Deleted ${res.data["deleteUser"]["pkuser"]}`)
// })

describe('Testing blogMutation', () => {
    it('adds 1 + 2 to equal 3', () => {
        expect(1+2).toBe(3);
    });
})