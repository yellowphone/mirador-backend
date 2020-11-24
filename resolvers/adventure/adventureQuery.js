const { ApolloError } = require('apollo-server');

const findAdventureByUser = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.adventures.findMany({
            where: {
                fk_user_adventure: args.pkuser
            }
        })
        return results
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

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
    findAdventureByUser,
    findAdventureById
}
