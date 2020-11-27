const { 
    createUser,
    followUser,
    unfollowUser,
    deleteUser
} = require('./user/userMutation')

const {
    createAdventure,
    saveAdventure,
    unsaveAdventure,
    visitAdventure,
    unvisitAdventure,
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
    unfollowUser,
    deleteUser,
    createAdventure,
    saveAdventure,
    unsaveAdventure,
    visitAdventure,
    unvisitAdventure,
    deleteAdventure,
    createBlog,
    deleteBlog,
    createItinerary,
    deleteItinerary
}