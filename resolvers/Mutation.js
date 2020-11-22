const { 
    createUser
} = require('./user/userMutation')

const {
    createAdventure
} = require('./adventure/adventureMutation')

module.exports = {
    createUser,
    createAdventure
}