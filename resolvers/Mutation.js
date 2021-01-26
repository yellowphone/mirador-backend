const { 
    createUser,
    deleteTagFromUser,
    followUser,
    unfollowUser,
    deleteUser
} = require('./user/userMutation')

const {
    createExperience,
    addImageToExperience,
    deleteTagFromExperience,
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
    deleteTagFromBlog,
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
    deleteTagFromItinerary,
    saveItinerary,
    unsaveItinerary,
    addUserToItinerary,
    deleteUserFromItinerary,
    deleteItinerary
} = require('./itinerary/itineraryMutation')

const {
    createImage
} = require('../service/upload')

module.exports = {
    createUser,
    deleteTagFromUser,
    followUser,
    unfollowUser,
    deleteUser,
    createExperience,
    addImageToExperience,
    deleteTagFromExperience,
    saveExperience,
    unsaveExperience,
    visitExperience,
    reviewExperience,
    deleteReviewExperience,
    unvisitExperience,
    deleteExperience,
    createBlog,
    deleteTagFromBlog,
    saveBlog,
    unsaveBlog,
    likeBlog,
    unlikeBlog,
    commentBlog,
    deleteCommentBlog,
    deleteBlog,
    createItinerary,
    deleteTagFromItinerary,
    saveItinerary,
    unsaveItinerary,
    addUserToItinerary,
    deleteUserFromItinerary,
    deleteItinerary,
    createImage
}