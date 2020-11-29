const { ApolloError } = require('apollo-server');

const createItinerary = async (parent, args, { prisma }) => {
    try {
        const itinerary = await prisma.itineraries.create({
            data: {
                title: args.title,
            },
        })
        console.log(itinerary)
        return itinerary
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }    
}

const addUserToItinerary = async (parent, args, { prisma }) => {
    try {
        const user_itinerary = await prisma.user_itineraries.create({
            data: {
                users: {
                    connect: {
                        pkuser: args.adding_user
                    }
                },
                itineraries: {
                    connect: {
                        pkitinerary: args.adding_itinerary
                    }
                }
            },
            include: {
                users: true,
                itineraries: true
            }
        })
        return user_itinerary
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const deleteUserFromItinerary = async (parent, args, { prisma }) => {
    try {
        const user_itinerary = await prisma.user_itineraries.delete({
            where: {
                pkuser_itinerary: args.pkuser_itinerary
            }
        })
        return user_itinerary
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
    addUserToItinerary,
    deleteUserFromItinerary,
    deleteItinerary
}