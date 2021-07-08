const { ApolloError } = require('apollo-server');

const findTripById = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.trips.findUnique({
            where: {
                pktrip: args.pktrip
            },
            include: {
                user_trips: {
                    include: {
                        users: true, 
                        trips: true
                    }
                },
                trip_tags: {
                    include: {
                        tags: true
                    }
                },
                trip_experiences: {
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

const findManyTrips = async(parent, args, { prisma }) => {
    try {
        // eventually want to place a filter but will figure out that algorithm later
        const results = await prisma.trips.findMany({
            take: 20,
            include: {
                trip_tags: {
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

const findTripByPublicIdentifier = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.trips.findUnique({
            where: {
                public_identifier: args.public_identifier
            },
            include: {
                user_trips: {
                    include: {
                        users: true, 
                        trips: true
                    }
                },
                trip_tags: {
                    include: {
                        tags: true
                    }
                },
                trip_experiences: {
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
    findTripById,
    findManyTrips,
    findTripByPublicIdentifier
}
