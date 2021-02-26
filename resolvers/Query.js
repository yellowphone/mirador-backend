const { 
    findUser,
    findUserByUsername,
    findUserByEmail,
    findManyUsers
} = require('./user/userQuery')

const {
    findExperienceById,
    findExperienceByTitle,
    findExperienceByCoordinates
} = require('./experience/experienceQuery')

const {
    findBlogById,
    findManyBlogs,
    findRandomBlog
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
    findBlogById,
    findManyBlogs,
    findRandomBlog,
    findItineraryById,
    getTags
}