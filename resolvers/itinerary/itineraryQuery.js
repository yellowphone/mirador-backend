const { ApolloError } = require('apollo-server');

const findItineraryById = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.itineraries.findOne({
            where: {
                pkitinerary: args.pkitinerary
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
    findItineraryById
}
