const { ApolloError } = require('apollo-server');

const createBlog = async (parent, args, { prisma }) => {
    try {
        const blog = await prisma.blogs.create({
            data: {
                title: args.title,
                users: {
                    connect: {
                        pkuser: args.pkuser
                    }
                }
            }
        })
        console.log(blog)
        return blog.title
    }
    catch(err) {
        console.log(err)
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
        console.log(err)
        return new ApolloError(err)
    }
}


module.exports = {
    createBlog,
    deleteBlog
}