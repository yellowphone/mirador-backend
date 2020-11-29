const { ApolloError } = require('apollo-server');

const createAdventure = async (parent, args, { prisma }) => {
    try {
        const adventure = await prisma.adventures.create({
            data: {
                title: args.title,
                users: {
                    connect: {
                        pkuser: args.pkuser
                    }
                },
                locations: {
                    create: {
                        lat: args.lat,
                        lng: args.lng
                    },
                },
            },
            include: {
                locations: true,
            },
        })
        return adventure
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }    
}

const saveAdventure = async (parent, args, { prisma }) => {
    try {
        const saved_adventure = await prisma.saved_adventures.create({
            data: {
                users: {
                    connect: {
                        pkuser: args.saving_user
                    }
                },
                adventures: {
                    connect: {
                        pkadventure: args.saving_adventure
                    }
                }
            },
            include: {
                users: true,
                adventures: true
            }
        })
        return saved_adventure
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const unsaveAdventure = async (parent, args, { prisma }) => {
    try {
        const saved_adventure = await prisma.saved_adventures.delete({
            where: {
                pksaved_adventure: args.pksaved_adventure
            }
        })
        return saved_adventure
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const visitAdventure = async (parent, args, { prisma }) => {
    try {
        const visited_adventure = await prisma.visited_adventures.create({
            data: {
                users: {
                    connect: {
                        pkuser: args.visiting_user
                    }
                },
                adventures: {
                    connect: {
                        pkadventure: args.visiting_adventure
                    }
                }
            },
            include: {
                users: true,
                adventures: true
            }
        })
        return visited_adventure
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const unvisitAdventure = async (parent, args, { prisma }) => {
    try {
        const visited_adventure = await prisma.visited_adventures.delete({
            where: {
                pkvisited_adventure: args.pkvisited_adventure
            }
        })
        return visited_adventure
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}


const deleteAdventure = async(parent, args, { prisma }) => {
    try {
        const adventure = await prisma.adventures.delete({
            where: {
                pkadventure: args.pkadventure
            }
        })
        return adventure
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

module.exports = {
    createAdventure,
    saveAdventure,
    unsaveAdventure,
    visitAdventure,
    unvisitAdventure,
    deleteAdventure
}
