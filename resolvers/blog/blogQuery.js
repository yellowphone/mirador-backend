const { ApolloError } = require('apollo-server');

const findBlogById = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.blogs.findOne({
            where: {
                pkblog: args.pkblog
            },
            include: {
                comment_blogs: {
                    include: {
                        users: true
                    }
                },
                liked_blogs: {
                    include: {
                        users: true
                    }
                },
                saved_blogs: {
                    include: {
                        users: true
                    }
                },
                blog_locations: true
            }
        })
        return results
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

module.exports = {
    findBlogById
}
