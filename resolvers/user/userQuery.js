const { ApolloError } = require('apollo-server');

const findUser = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.users.findOne({
            where: {
                pkuser: args.pkuser
            },
            include: {
                adventures: true,
                blogs: true
            },
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
        const results = await prisma.users.findMany({
            where: {
                firstname: args.firstname
            },
            include: {
                adventures: true,
                blogs: true,
            },
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