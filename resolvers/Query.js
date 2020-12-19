const { 
    findUser,
    findUserByUsername,
    findManyUsers
} = require('./user/userQuery')

const {
    findAdventureById,
    findAdventureByCoordinates
} = require('./adventure/adventureQuery')

const {
    findBlogById
} = require('./blog/blogQuery')

const {
    findItineraryById
} = require('./itinerary/itineraryQuery')

module.exports = {
    findUser,
    findUserByUsername,
    findManyUsers,
    findAdventureById,
    findAdventureByCoordinates,
    findBlogById,
    findItineraryById,
}