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
                followers_followers_user_followingTousers: true,
                saved_adventures: true,
                visited_adventures: true
            },
        })
        return results
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const findFollowers = async(parent, args, { prisma }) => {
    try {
        const results = await prisma.followers.findMany({
            where: {
                user_following: args.pkuser
            },
            include: {
                users_followers_user_followedTousers: true,
                users_followers_user_followingTousers: true
            }
        })
        return results
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const findSavedAdventures = async(parent, args, { prisma }) => {
    try {
        const results = await prisma.saved_adventures.findMany({
            where: {
                saving_user: args.pkuser
            },
            include: {
                adventures: true,
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

const findVisitedAdventures = async(parent, args, { prisma }) => {
    try {
        const results = await prisma.visited_adventures.findMany({
            where: {
                visiting_user: args.pkuser
            },
            include: {
                adventures: true,
                users: true
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
                followers_followers_user_followingTousers: true,
                saved_adventures: true,
                visited_adventures: true
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
    findFollowers,
    findSavedAdventures,
    findVisitedAdventures,
    findManyUsers
}