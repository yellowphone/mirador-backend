const { 
    createUser,
    followUser,
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

const {
    createItinerary,
    deleteItinerary
} = require('./itinerary/itineraryMutation')

module.exports = {
    createUser,
    followUser,
    deleteUser,
    createAdventure,
    deleteAdventure,
    createBlog,
    deleteBlog,
    createItinerary,
    deleteItinerary
}