const { ApolloError } = require('apollo-server');

const findUser = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.user.findOne({
            where: {
                email: args.email
            }
        })
        return results
    }
    catch(err) {
        console.log(err)
        return new ApolloError("Uh oh!")
    }
}

const findManyUsers = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.user.findMany({
            where: {
                name: args.name
            }
        })
        return results
    }
    catch(err) {
        console.log(err)
        return new ApolloError("Uh oh!")
    }
}

module.exports = {
    findUser,
    findManyUsers
}