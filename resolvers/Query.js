const { 
    findUser,
    findManyUsers
} = require('./user/userQuery')

const {
    findAdventureByUser
} = require('./adventure/adventureQuery')

const {
    findBlogByUser
} = require('./blog/blogQuery')

module.exports = {
    findUser,
    findManyUsers,
    findAdventureByUser,
    findBlogByUser
}