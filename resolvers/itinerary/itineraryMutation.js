const { ApolloError } = require('apollo-server');
const { nanoid } = require('nanoid');

const createItinerary = async (parent, args, { prisma }) => {
    try {
        const unique_nano_id = nanoid(12)
        const itinerary = await prisma.itineraries.create({
            data: {
                title: args.title,
                summary: args.summary,
                content: args.content,
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
                await prisma.itinerary_tags.create({
                    data: {
                        tags: {
                            connect: {
                                pktag: tag
                            }
                        },
                        itineraries: {
                            connect: {
                                pkitinerary: itinerary.pkitinerary
                            }
                        }
                    }
                })
            })
        }

        return itinerary
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }    
}

const updateItinerary = async (parent, args, { prisma }) => {
    try {
        const itinerary = await prisma.itineraries.update({
            where: {
                pkitinerary: args.pkitinerary
            },
            data: {
                title: args.title,
                content: args.content
            }
        })
        return itinerary
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

// add experience to itinerary
const addExperienceToItinerary = async (parent, args, { prisma }) => {
    try {
        const itinerary_experience = await prisma.itinerary_experiences.create({
            data: {
                experiences: {
                    connect: {
                        pkexperience: args.pkexperience
                    }
                },
                itineraries: {
                    connect: {
                        pkitinerary: args.pkitinerary
                    }
                }
            }
        })
        return itinerary_experience
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const addTagToItinerary = async (parent, args, { prisma }) => {
    try {
        const tag = await prisma.itinerary_tags.create({
            data: {
                tags: {
                    connect: {
                        pktag: args.pktag
                    }
                },
                itineraries: {
                    connect: {
                        pkitinerary: args.pkitinerary
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

const deleteTagFromItinerary = async (parent, args, { prisma }) => {
    try {
        const delete_tag = await prisma.itinerary_tags.delete({
            where: {
                pkitinerary_tag: args.pkitinerary_tag
            }
        })
        return delete_tag
    }
    catch {
        console.error(err)
        return new ApolloError(err)
    }
}

const saveItinerary = async (parent, args, { prisma }) => {
    try {
        const saved_itinerary = await prisma.saved_itineraries.create({
            data: {
                users: {
                    connect: {
                        pkuser: args.saving_user
                    }
                },
                itineraries: {
                    connect: {
                        pkitinerary: args.saving_itinerary
                    }
                }
            },
            include: {
                users: true,
                itineraries: true
            }
        })
        return saved_itinerary
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const unsaveItinerary = async (parent, args, { prisma }) => {
    try {
        const saved_itinerary = await prisma.saved_itineraries.delete({
            where: {
                pksaved_itinerary: args.pksaved_itinerary
            }
        })
        return saved_itinerary
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
    updateItinerary,
    addExperienceToItinerary,
    addTagToItinerary,
    deleteTagFromItinerary,
    saveItinerary,
    unsaveItinerary,
    addUserToItinerary,
    deleteUserFromItinerary,
    deleteItinerary
}