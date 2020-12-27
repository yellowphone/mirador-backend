const gql = require('graphql-tag');
const { client } = require('../testInit');

var testUser = 0
var testBlog = 0

// Run before any userQuery tests are run
beforeAll(async () => {
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
})

// afterEach(() => { 
//     jest.clearAllMocks(); 
//     jest.resetAllMocks();
// });

describe('Testing blogMutation', () => {

    it('Creating a blog', async () => {
        console.log(`${testUser}`)
        await expect(client.mutate({
            mutation: gql`
                mutation {
                    createBlog(title: "test", pkuser: ${testUser}, summary: "test", content: "test") {
                        title
                        fk_user_blog
                        summary
                        content
                    }
                }`
        })).resolves.toStrictEqual({"data": {"createBlog": {"__typename": "Blog", "title": "test", "fk_user_blog": testUser, "summary": "test", "content": "test"}}})
    })

    it('Deleting a blog', async () => {
        const res = await client.query({
            query: gql`
                query {
                    findUser(pkuser: ${testUser}) {
                        blogs {
                            pkblog
                        }
                    }
                }`
        })
        testBlog = res.data["findUser"]["blogs"][0]["pkblog"]
        console.log(`Test blog with primary key: ${testBlog}`)

        await expect(client.mutate({
            mutation: gql`
                mutation {
                    deleteBlog(pkblog: ${testBlog}) {
                        pkblog
                    }
                }`
        })).resolves.toStrictEqual({"data": {"deleteBlog": {"__typename": "Blog", "pkblog": testBlog}}})
    })

})

// Run after all userQuery tests are run
afterAll(async () => {
    const res = await client.mutate({
        mutation: gql`
        mutation {
            deleteUser(pkuser: ${testUser}) {
            pkuser
            }
        }`
    })
    console.log(`Deleted ${res.data["deleteUser"]["pkuser"]}`)
})