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
    updateBlog,
    saveBlog,
    unsaveBlog,
    likeBlog,
    unlikeBlog,
    commentBlog,
    deleteCommentBlog,
    deleteBlog
} = require('./blog/blogMutation')

const {
    createTrip,
    updateTrip,
    addExperienceToTrip,
    addTagToTrip,
    deleteTagFromTrip,
    saveTrip,
    unsaveTrip,
    addUserToTrip,
    deleteUserFromTrip,
    deleteTrip
} = require('./trip/tripMutation')

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
    updateBlog,
    deleteTagFromBlog,
    saveBlog,
    unsaveBlog,
    likeBlog,
    unlikeBlog,
    commentBlog,
    deleteCommentBlog,
    deleteBlog,

    createTrip,
    updateTrip,
    addExperienceToTrip,
    addTagToTrip,
    deleteTagFromTrip,
    saveTrip,
    unsaveTrip,
    addUserToTrip,
    deleteUserFromTrip,
    deleteTrip,
    
    createImage,
    addTag
}