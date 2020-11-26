const { ApolloError } = require('apollo-server');

const createUser = async (parent, args, { prisma }) => {
    try {
        const user = await prisma.users.create({
            data: {
                username: args.username,
                email: args.email,
                password: args.password,
                firstname: args.firstname,
                lastname: args.lastname
            }
        })
        return user;
    }
    catch(err) {
        console.error(err)
        if (err.code == "P2002") {
            return new ApolloError("User already exists")
        }
        else {
            return new ApolloError(err)
        }
    }    
}

const followUser = async(parent, args, {prisma}) => {
    try {
        const follower = await prisma.followers.create({
            data: {
                users_followers_user_followedTousers: {
                    connect: {
                        pkuser: args.user_following
                    }
                },
                users_followers_user_followingTousers: {
                    connect: {
                        pkuser: args.user_followed
                    }
                }
            }
        })
        return follower;
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const deleteUser = async(parent, args, { prisma }) => {
    try {
        const user = await prisma.users.delete({
            where: { pkuser: args.pkuser }
        })
        return user
    }
    catch(err) {
        console.error(err);
        return new ApolloError(err)
    }
}

module.exports = {
    createUser,
    followUser,
    deleteUser
}