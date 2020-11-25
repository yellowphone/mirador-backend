const { 
    findUser,
    findFollowers,
    findManyUsers
} = require('./user/userQuery')

const {
    findAdventureByUser,
    findAdventureById
} = require('./adventure/adventureQuery')

const {
    findBlogByUser
} = require('./blog/blogQuery')

const {
    findItineraryById
} = require('./itinerary/itineraryQuery')

module.exports = {
    findUser,
    findFollowers,
    findManyUsers,
    findAdventureByUser,
    findAdventureById,
    findBlogByUser,
    findItineraryById
}