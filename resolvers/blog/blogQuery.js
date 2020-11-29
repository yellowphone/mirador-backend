const { ApolloError } = require('apollo-server');

const findBlogById = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.blogs.findOne({
            where: {
                pkblog: args.pkblog
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
