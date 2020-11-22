const { ApolloError } = require('apollo-server');

const createAdventure = async (parent, args, { prisma }) => {
    try {
        const adventure = await prisma.adventures.create({
            data: {
                title: args.title,
                users: {
                    connect: {
                        username: args.username
                    }
                }
            }
        })
        console.log(adventure)
        return adventure.title
    }
    catch(err) {
        console.log(err)
        return new ApolloError(err)
    }    
}

module.exports = {
    createAdventure
}