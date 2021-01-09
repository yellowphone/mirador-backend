const { 
    createUser,
    followUser,
    unfollowUser,
    deleteUser
} = require('./user/userMutation')

const {
    createExperience,
    addImageToExperience,
    saveExperience,
    unsaveExperience,
    visitExperience,
    reviewExperience,
    deleteReviewExperience,
    unvisitExperience,
    deleteExperience
} = require('./experience/experienceMutation')

const {
    createBlog,
    saveBlog,
    unsaveBlog,
    likeBlog,
    unlikeBlog,
    commentBlog,
    deleteCommentBlog,
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
    createExperience,
    addImageToExperience,
    saveExperience,
    unsaveExperience,
    visitExperience,
    reviewExperience,
    deleteReviewExperience,
    unvisitExperience,
    deleteExperience,
    createBlog,
    saveBlog,
    unsaveBlog,
    likeBlog,
    unlikeBlog,
    commentBlog,
    deleteCommentBlog,
    deleteBlog,
    createItinerary,
    saveItinerary,
    unsaveItinerary,
    addUserToItinerary,
    deleteUserFromItinerary,
    deleteItinerary
}