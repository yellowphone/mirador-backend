const { ApolloError } = require('apollo-server');

const findUser = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.user.findOne({
            where: {
                username: args.username
            }
        })
        return results
    }
    catch(err) {
        console.log(err)
        return new ApolloError(err)
    }
}

const findManyUsers = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.user.findMany({
            where: {
                firstname: args.firstname
            }
        })
        return results
    }
    catch(err) {
        console.log(err)
        return new ApolloError(err)
    }
}

module.exports = {
    findUser,
    findManyUsers
}