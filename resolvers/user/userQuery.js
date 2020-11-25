const { ApolloError } = require('apollo-server');

const findUser = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.users.findOne({
            where: {
                pkuser: args.pkuser
            },
            include: {
                adventures: true,
                blogs: true,
                followers_followers_user_followedTousers: true,
                followers_followers_user_followingTousers: true
            },
        })
        return results
    }
    catch(err) {
        console.error(err)
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
                followers_followers_user_followedTousers: true,
                followers_followers_user_followingTousers: true
            },
        })
        return results
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

module.exports = {
    findUser,
    findManyUsers
}