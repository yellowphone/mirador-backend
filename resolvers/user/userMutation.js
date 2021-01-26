const { ApolloError } = require('apollo-server');

const createUser = async (parent, args, { prisma }) => {
    try {
        const user = await prisma.users.create({
            data: {
                username: args.username,
                email: args.email,
                firstname: args.firstname,
                lastname: args.lastname,
                bio: args.bio,
                userid: args.userid,
                access_token: args.access_token,
                account_type: args.account_type
            }
        })

        if (args.tags) {
            args.tags.map(async (tag) => {
                await prisma.user_tags.create({
                    data: {
                        user_tag: tag,
                        users: {
                            connect: {
                                pkuser: user.pkuser
                            }
                        }
                    }
                })
            })
        }
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

const deleteTagFromUser = async (parent, args, { prisma }) => {
    try {
        const delete_tag = await prisma.user_tags.delete({
            where: {
                pkuser_tag: args.pkuser_tag
            }
        })
        return delete_tag
    }
    catch {
        console.error(err)
        return new ApolloError(err)
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

const unfollowUser = async (parent, args, {prisma}) => {
    try {
        const follower = await prisma.followers.delete({
            where: {
                pkfollower: args.pkfollower
            }
        })
        return follower
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
    deleteTagFromUser,
    followUser,
    unfollowUser,
    deleteUser
}