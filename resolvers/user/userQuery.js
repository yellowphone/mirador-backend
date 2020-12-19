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
                followers_followers_user_followedTousers: {
                    include: {
                        users_followers_user_followingTousers: true
                    }
                },
                followers_followers_user_followingTousers: {
                    include: {
                        users_followers_user_followedTousers: true,
                    }
                },
                saved_adventures: {
                    include: {
                        adventures: true, 
                    }
                },
                visited_adventures: {
                    include: {
                        adventures: true, 
                    }
                },
                user_itineraries: {
                    include: {
                        itineraries: true,
                    }
                },
                saved_blogs: {
                    include: {
                        blogs: true,
                    }
                },
                liked_blogs: {
                    include: {
                        blogs: true
                    }
                },
                saved_itineraries: {
                    include: {
                        itineraries: true,
                    }
                }
            },
        })
        return results
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const findUserByUsername = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.users.findOne({
            where: {
                username: args.username
            },
            include: {
                adventures: true,
                blogs: true,
                followers_followers_user_followedTousers: {
                    include: {
                        users_followers_user_followingTousers: true
                    }
                },
                followers_followers_user_followingTousers: {
                    include: {
                        users_followers_user_followedTousers: true,
                    }
                },
                saved_adventures: {
                    include: {
                        adventures: true, 
                    }
                },
                visited_adventures: {
                    include: {
                        adventures: true, 
                    }
                },
                user_itineraries: {
                    include: {
                        itineraries: true,
                    }
                },
                saved_blogs: {
                    include: {
                        blogs: true,
                    }
                },
                liked_blogs: {
                    include: {
                        blogs: true
                    }
                },
                saved_itineraries: {
                    include: {
                        itineraries: true,
                    }
                }
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
    findUserByUsername,
    findManyUsers
}