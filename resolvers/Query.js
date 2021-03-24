const { 
    findUser,
    findUserByUsername,
    findUserByEmail,
    findManyUsers
} = require('./user/userQuery')

const {
    findExperienceById,
    findExperienceByTitle,
    findExperienceByCoordinates,
    findExperienceByPublicIdentifier
} = require('./experience/experienceQuery')

const {
    findBlogById,
    findManyBlogs,
    findRandomBlog,
    findBlogByPublicIdentifier
} = require('./blog/blogQuery')

const {
    findItineraryById
} = require('./itinerary/itineraryQuery')

const {
    getTags
} = require('../service/tags')

module.exports = {
    findUser,
    findUserByUsername,
    findUserByEmail,
    findManyUsers,
    findExperienceById,
    findExperienceByTitle,
    findExperienceByCoordinates,
    findExperienceByPublicIdentifier,
    findBlogById,
    findManyBlogs,
    findRandomBlog,
    findBlogByPublicIdentifier,
    findItineraryById,
    getTags
}