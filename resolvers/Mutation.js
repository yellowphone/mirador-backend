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
    likeBlog,
    unlikeBlog,
    deleteBlog
} = require('./blog/blogMutation')

const {
    createItinerary,
    saveItinerary,
    unsaveItinerary,
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
    likeBlog,
    unlikeBlog,
    deleteBlog,
    createItinerary,
    saveItinerary,
    unsaveItinerary,
    addUserToItinerary,
    deleteUserFromItinerary,
    deleteItinerary
}