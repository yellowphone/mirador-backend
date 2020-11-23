const { 
    createUser,
    deleteUser
} = require('./user/userMutation')

const {
    createAdventure,
    deleteAdventure
} = require('./adventure/adventureMutation')

const {
    createBlog,
    deleteBlog
} = require('./blog/blogMutation')

module.exports = {
    createUser,
    deleteUser,
    createAdventure,
    deleteAdventure,
    createBlog,
    deleteBlog
}