const { ApolloError } = require('apollo-server');

const createUser = async (parent, args, { prisma }) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: args.email,
                name: args.name
            }
        })
        return args.email
    }
    catch(err) {
        console.log(err)
        return new ApolloError("Uh oh!")
    }    
}

module.exports = {
    createUser
}