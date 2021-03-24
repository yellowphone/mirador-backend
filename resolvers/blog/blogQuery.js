const { ApolloError } = require('apollo-server');

const findBlogById = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.blogs.findUnique({
            where: {
                pkblog: args.pkblog
            },
            include: {
                comment_blogs: {
                    include: {
                        users: true
                    }
                },
                liked_blogs: {
                    include: {
                        users: true
                    }
                },
                saved_blogs: {
                    include: {
                        users: true
                    }
                },
                blog_locations: true,
                blog_tags: {
                    include: {
                        tags: true
                    }
                }
            }
        })
        return results
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const findManyBlogs = async(parent, args, { prisma }) => {
    try {
        // eventually want to place a filter but will figure out that algorithm later
        const results = await prisma.blogs.findMany({
            include: {
                blog_tags: {
                    include: {
                        tags: true
                    }
                }
            }
        })
        return results
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const findRandomBlog = async(parent, args, { prisma }) => {
    try {
        const results = await prisma.$queryRaw(
            `SELECT public_identifier FROM public.blogs WHERE pkblog != $1 ORDER BY RANDOM() LIMIT 1;`,
            args.previousPrimaryKey
        )
        return results;
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const findBlogByPublicIdentifier = async (parent, args, { prisma }) => {
    try {
        const results = await prisma.blogs.findUnique({
            where: {
                public_identifier: args.public_identifier
            },
            include: {
                comment_blogs: {
                    include: {
                        users: true
                    }
                },
                liked_blogs: {
                    include: {
                        users: true
                    }
                },
                saved_blogs: {
                    include: {
                        users: true
                    }
                },
                blog_locations: true,
                blog_tags: {
                    include: {
                        tags: true
                    }
                }
            }
        })
        return results
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

module.exports = {
    findBlogById,
    findManyBlogs,
    findRandomBlog,
    findBlogByPublicIdentifier
}
