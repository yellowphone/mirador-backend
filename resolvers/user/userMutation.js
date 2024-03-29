const { ApolloError } = require('apollo-server');

const createUser = async (parent, args, { prisma }) => {
    const username = args.email.split('@')[0];
    try {
        const user = await prisma.users.create({
            data: {
                email: args.email,
                username,
                firstname: args.firstname,
                lastname: args.lastname,
                access_token: args.access_token,
                user_id: args.user_id,
                image_url: args.image_url,
                // account_type: args.account_type, // will add back once we update our graphql generation
            }
        });

        return user;
    }
    catch(err) {
        console.log('caught')
        console.error(err)
        if (err.code == "P2002") {
            return new ApolloError("User already exists")
        }
        else {
            return new ApolloError(err)
        }
    }    
}

const addTagToUser = async (parent, args, { prisma }) => {
    try {
        const tag = await prisma.user_tags.create({
            data: {
                tags: {
                    connect: {
                        pktag: args.pktag
                    }
                },
                users: {
                    connect: {
                        pkuser: args.pkuser
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
    addTagToUser,
    deleteTagFromUser,
    followUser,
    unfollowUser,
    deleteUser
}