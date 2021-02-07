const { 
    createUser,
    addTagToUser,
    deleteTagFromUser,
    followUser,
    unfollowUser,
    deleteUser
} = require('./user/userMutation')

const {
    createExperience,
    addImageToExperience,
    addTagToExperience,
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
    addTagToBlog,
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
    addTagToItinerary,
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

const {
    addTag
} = require('../service/tags')

module.exports = {
    createUser,
    addTagToUser,
    deleteTagFromUser,
    followUser,
    unfollowUser,
    deleteUser,
    createExperience,
    addImageToExperience,
    addTagToExperience,
    deleteTagFromExperience,
    saveExperience,
    unsaveExperience,
    visitExperience,
    reviewExperience,
    deleteReviewExperience,
    unvisitExperience,
    deleteExperience,
    createBlog,
    addTagToBlog,
    deleteTagFromBlog,
    saveBlog,
    unsaveBlog,
    likeBlog,
    unlikeBlog,
    commentBlog,
    deleteCommentBlog,
    deleteBlog,
    createItinerary,
    addTagToItinerary,
    deleteTagFromItinerary,
    saveItinerary,
    unsaveItinerary,
    addUserToItinerary,
    deleteUserFromItinerary,
    deleteItinerary,
    createImage,
    addTag
}