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
                },
                itinerary_experiences: {
                    include: {
                        experiences: true
                    }
                },
                users: true
            }
        })
        return results
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const findManyItineraries = async(parent, args, { prisma }) => {
    try {
        // eventually want to place a filter but will figure out that algorithm later
        const results = await prisma.itineraries.findMany({
            take: 20,
            include: {
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

const findItineraryByPublicIdentifier = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.itineraries.findUnique({
            where: {
                public_identifier: args.public_identifier
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
                },
                itinerary_experiences: {
                    include: {
                        experiences: {
                            include: {
                                experience_tags: {
                                    include: {
                                        tags: true
                                    }
                                },
                                experience_images: {
                                    include: {
                                        images: true
                                    }
                                }
                            }
                        }
                    }
                },
                users: true
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
    findItineraryById,
    findManyItineraries,
    findItineraryByPublicIdentifier
}
