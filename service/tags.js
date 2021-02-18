const { ApolloError } = require('apollo-server');

const addTag = async (parent, args, { prisma }) => {
    try {
        const tag = await prisma.tags.create({
            data: {
                tag: args.tag
            }
        })
        return tag
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const getTags = async (parent, args, { prisma }) => {
    try {
        const tags = await prisma.tags.findMany();
        return tags
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

module.exports = {
    addTag,
    getTags
}