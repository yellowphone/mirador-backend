const { ApolloError } = require('apollo-server');

const createBlog = async (parent, args, { prisma }) => {
    try {
        const blog = await prisma.blogs.create({
            data: {
                title: args.title,
                summary: args.summary,
                content: args.content,
                users: {
                    connect: {
                        pkuser: args.pkuser
                    }
                }
            }
        })
        return blog
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }    
}

const saveBlog = async (parent, args, { prisma }) => {
    try {
        const saved_blog = await prisma.saved_blogs.create({
            data: {
                users: {
                    connect: {
                        pkuser: args.saving_user
                    }
                },
                blogs: {
                    connect: {
                        pkblog: args.saving_blog
                    }
                }
            },
            include: {
                users: true,
                blogs: true
            }
        })
        return saved_blog
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const unsaveBlog = async (parent, args, { prisma }) => {
    try {
        const saved_blog = await prisma.saved_blogs.delete({
            where: {
                pksaved_blog: args.pksaved_blog
            }
        })
        return saved_blog
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const deleteBlog = async(parent, args, { prisma }) => {
    try {
        const blog = await prisma.blogs.delete({
            where: {
                pkblog: args.pkblog
            }
        })
        return blog
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}


module.exports = {
    createBlog,
    saveBlog,
    unsaveBlog,
    deleteBlog
}