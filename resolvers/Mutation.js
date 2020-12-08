const { 
    createUser,
    followUser,
    unfollowUser,
    deleteUser
} = require('./user/userMutation')

const {
    createAdventure,
    addImageToAdventure,
    saveAdventure,
    unsaveAdventure,
    visitAdventure,
    unvisitAdventure,
    deleteAdventure
} = require('./adventure/adventureMutation')

const {
    createBlog,
    saveBlog,
    unsaveBlog,
    deleteBlog
} = require('./blog/blogMutation')

const {
    createItinerary,
    addUserToItinerary,
    deleteUserFromItinerary,
    deleteItinerary
} = require('./itinerary/itineraryMutation')

module.exports = {
    createUser,
    followUser,
    unfollowUser,
    deleteUser,
    createAdventure,
    addImageToAdventure,
    saveAdventure,
    unsaveAdventure,
    visitAdventure,
    unvisitAdventure,
    deleteAdventure,
    createBlog,
    saveBlog,
    unsaveBlog,
    deleteBlog,
    createItinerary,
    addUserToItinerary,
    deleteUserFromItinerary,
    deleteItinerary
}