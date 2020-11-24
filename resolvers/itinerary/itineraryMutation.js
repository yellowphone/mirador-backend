const { ApolloError } = require('apollo-server');

const createItinerary = async (parent, args, { prisma }) => {
    try {
        const itinerary = await prisma.itineraries.create({
            data: {
                title: args.title,
            }
        })
        console.log(itinerary)
        return itinerary
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }    
}

const deleteItinerary = async(parent, args, { prisma }) => {
    try {
        const itinerary = await prisma.itineraries.delete({
            where: {
                pkitinerary: args.pkitinerary
            }
        })
        return itinerary
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}


module.exports = {
    createItinerary,
    deleteItinerary
}