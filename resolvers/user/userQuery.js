const { ApolloError } = require('apollo-server');

const findUser = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.users.findUnique({
            where: {
                pkuser: args.pkuser
            },
            include: {
                experiences: {
                    include: {
                        experience_locations: true,
                        experience_tags: true
                    }
                },
                blogs: {
                    include: {
                        blog_locations: true,
                        liked_blogs: true,
                        comment_blogs: true,
                        saved_blogs: true,
                        blog_tags: true
                    }
                },
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
                saved_experiences: {
                    include: {
                        experiences: true, 
                    }
                },
                visited_experiences: {
                    include: {
                        experiences: true, 
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
                },
                user_tags: true
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
        const results = await prisma.users.findUnique({
            where: {
                username: args.username
            },
            include: {
                experiences: true,
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
                saved_experiences: {
                    include: {
                        experiences: true, 
                    }
                },
                visited_experiences: {
                    include: {
                        experiences: true, 
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
                experiences: true,
                blogs: true,
                followers_followers_user_followedTousers: true,
                followers_followers_user_followingTousers: true,
                saved_experiences: true,
                visited_experiences: true
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