const { 
    findUser,
    findManyUsers
} = require('./user/userQuery')

const {
    findAdventureByUser
} = require('./adventure/adventureQuery')

module.exports = {
    findUser,
    findManyUsers,
    findAdventureByUser
}