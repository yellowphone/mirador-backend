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
        console.log(err)
        return new ApolloError(err)
    }
}

module.exports = {
    findAdventureByUser
}
