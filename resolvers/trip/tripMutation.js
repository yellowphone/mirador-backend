const { ApolloError } = require('apollo-server');
const { nanoid } = require('nanoid');

const createTrip = async (parent, args, { prisma }) => {
    try {
        const unique_nano_id = nanoid(12)
        const trip = await prisma.trips.create({
            data: {
                title: args.title,
                summary: args.summary,
                mongoid: args.mongoid,
                public_identifier: unique_nano_id,
                users: {
                    connect: {
                        pkuser: args.pkuser
                    }
                }
            },
        })

        if (args.tags) {
            args.tags.map(async (tag) => {
                await prisma.trip_tags.create({
                    data: {
                        tags: {
                            connect: {
                                pktag: tag
                            }
                        },
                        trips: {
                            connect: {
                                pktrip: trip.pktrip
                            }
                        }
                    }
                })
            })
        }

        return trip
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }    
}

const updateTrip = async (parent, args, { prisma }) => {
    try {
        const trip = await prisma.trips.update({
            where: {
                public_identifier: args.public_identifier
            },
            data: {
                title: args.title,
                mongoid: args.mongoid
            }
        })
        return trip
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

// add experience to trip
const addExperienceToTrip = async (parent, args, { prisma }) => {
    try {
        const trip_experience = await prisma.trip_experiences.create({
            data: {
                experiences: {
                    connect: {
                        pkexperience: args.pkexperience
                    }
                },
                trips: {
                    connect: {
                        pktrip: args.pktrip
                    }
                }
            }
        })
        return trip_experience
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const addTagToTrip = async (parent, args, { prisma }) => {
    try {
        const tag = await prisma.trip_tags.create({
            data: {
                tags: {
                    connect: {
                        pktag: args.pktag
                    }
                },
                trips: {
                    connect: {
                        pktrip: args.pktrip
                    }
                }
            }
        })
        return tag
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const deleteTagFromTrip = async (parent, args, { prisma }) => {
    try {
        const delete_tag = await prisma.trip_tags.delete({
            where: {
                pktrip_tag: args.pktrip_tag
            }
        })
        return delete_tag
    }
    catch {
        console.error(err)
        return new ApolloError(err)
    }
}

const saveTrip = async (parent, args, { prisma }) => {
    try {
        const saved_trip = await prisma.saved_trips.create({
            data: {
                users: {
                    connect: {
                        pkuser: args.saving_user
                    }
                },
                trips: {
                    connect: {
                        pktrip: args.saving_trip
                    }
                }
            },
            include: {
                users: true,
                trips: true
            }
        })
        return saved_trip
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const unsaveTrip = async (parent, args, { prisma }) => {
    try {
        const saved_trip = await prisma.saved_trips.delete({
            where: {
                pksaved_trip: args.pksaved_trip
            }
        })
        return saved_trip
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const addUserToTrip = async (parent, args, { prisma }) => {
    try {
        const user_trip = await prisma.user_trips.create({
            data: {
                users: {
                    connect: {
                        pkuser: args.adding_user
                    }
                },
                trips: {
                    connect: {
                        pktrip: args.adding_trip
                    }
                }
            },
            include: {
                users: true,
                trips: true
            }
        })
        return user_trip
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const deleteUserFromTrip = async (parent, args, { prisma }) => {
    try {
        const user_trip = await prisma.user_trips.delete({
            where: {
                pkuser_trip: args.pkuser_trip
            }
        })
        return user_trip
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const deleteTrip = async(parent, args, { prisma }) => {
    try {
        const trip = await prisma.trips.delete({
            where: {
                public_identifier: args.public_identifier
            }
        })
        return trip
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}


module.exports = {
    createTrip,
    updateTrip,
    addExperienceToTrip,
    addTagToTrip,
    deleteTagFromTrip,
    saveTrip,
    unsaveTrip,
    addUserToTrip,
    deleteUserFromTrip,
    deleteTrip
}