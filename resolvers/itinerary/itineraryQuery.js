const { ApolloError } = require('apollo-server');

const findItineraryById = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.itineraries.findUnique({
            where: {
                pkitinerary: args.pkitinerary
            },
            include: {
                user_itineraries: {
                    include: {
                        users: true, 
                        itineraries: true
                    }
                },
                itinerary_tags: {
                    include: {
                        tags: true
                    }
                }
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
    findItineraryById
}
