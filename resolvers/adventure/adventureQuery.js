const { ApolloError } = require('apollo-server');

const findAdventureById = async(parent, args, { prisma }) => {
    try {
        const results = await prisma.adventures.findOne({
            where: {
                pkadventure: args.pkadventure
            },
            include: {
                locations: true,
            },
        })
        return results
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

module.exports = {
    findAdventureById
}
