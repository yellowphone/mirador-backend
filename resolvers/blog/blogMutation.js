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

const likeBlog = async (parent, args, { prisma }) => {
    try {
        const liked_blog = await prisma.liked_blogs.create({
            data: {
                users: {
                    connect: {
                        pkuser: args.liking_user
                    }
                },
                blogs: {
                    connect: {
                        pkblog: args.liking_blog
                    }
                }
            },
            include: {
                users: true,
                blogs: true
            }
        })
        return liked_blog
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const unlikeBlog = async (parent, args, { prisma }) => {
    try {
        const liked_blog = await prisma.liked_blogs.delete({
            where: {
                pkliked_blog: args.pkliked_blog
            }
        })
        return liked_blog
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const commentBlog = async (parent, args, { prisma }) => {
    try {
        const comment_blog = await prisma.comment_blogs.create({
            data: {
                comment: args.comment,
                users: {
                    connect: {
                        pkuser: args.pkuser
                    }
                },
                blogs: {
                    connect: {
                        pkblog: args.pkblog
                    }
                }
            },
            include: {
                blogs: true, 
                users: true
            }
        })
        return comment_blog
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const deleteCommentBlog = async (parent, args, { prisma }) => {
    try {
        const comment_blog = await prisma.comment_blogs.delete({
            where: {
                pkcomment_blog: args.pkcomment_blog
            }
        })
        return comment_blog
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
    likeBlog,
    unlikeBlog,
    commentBlog,
    deleteCommentBlog,
    deleteBlog
}