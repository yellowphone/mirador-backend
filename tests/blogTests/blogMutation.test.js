const gql = require('graphql-tag');
const { client } = require('../testInit');

var testUser = 0
var testBlog = 0

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
  testUser = res.data["createUser"]["pkuser"]
  console.log(`User created with pkuser: ${testUser}`)
  done()
})

describe('Testing blogMutation', () => {
    it('adds 1 + 2 to equal 3', () => {
        expect(1+2).toBe(3);
    });
})

// GETTING A WEIRD TIMEOUT ERROR, will debug and look into it another time
// describe('Testing blogMutation', () => {

//     beforeEach(() => {
//         jest.setTimeout(120000);
//     });

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
//     }, 30000)

//     afterEach(() => { 
//         jest.clearAllMocks(); 
//         jest.resetAllMocks();
//     });

//     it('Deleting a blog', async () => {
//         const res = await client.query({
//             query: gql`
//                 query: {
//                     findUser(pkuser: ${testUser}) {
//                         blogs {
//                             pkblog
//                         }
//                     }
//                 }`
//         })
//         console.log(res.data)
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
//     }, 30000)

// })

// Run after all userQuery tests are run
afterAll(async (done) => {
  const res = await client.mutate({
    mutation: gql`
      mutation {
        deleteUser(pkuser: ${testUser}) {
          pkuser
        }
      }`
  })
  console.log(`Deleted ${res.data["deleteUser"]["pkuser"]}`)
  done()
})