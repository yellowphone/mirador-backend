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
    findBlogByPublicIdentifier
} = require('./blog/blogQuery')

const {
    findTripById,
    findManyTrips,
    findTripByPublicIdentifier
} = require('./trip/tripQuery')

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
    findBlogByPublicIdentifier,
    findTripById,
    findManyTrips,
    findTripByPublicIdentifier,
    getTags
}