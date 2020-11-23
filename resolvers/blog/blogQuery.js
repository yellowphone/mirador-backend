const { ApolloError } = require('apollo-server');

const findBlogByUser = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.blogs.findMany({
            where: {
                fk_user_blog: args.pkuser
            }
        })
        return results
    }
    catch(err) {
        console.log(err)
        return new ApolloError(err)
    }
}

module.exports = {
    findBlogByUser
}
