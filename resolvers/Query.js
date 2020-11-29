const { 
    findUser,
    findManyUsers
} = require('./user/userQuery')

const {
    findAdventureById
} = require('./adventure/adventureQuery')

const {
    findBlogById
} = require('./blog/blogQuery')

const {
    findItineraryById
} = require('./itinerary/itineraryQuery')

module.exports = {
    findUser,
    findManyUsers,
    findAdventureById,
    findBlogById,
    findItineraryById
}