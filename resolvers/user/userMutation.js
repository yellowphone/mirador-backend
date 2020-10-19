const { ApolloError } = require('apollo-server');

const createUser = async (parent, args, { prisma }) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: args.username,
                email: args.email,
                firstname: args.firstname,
                lastname: args.lastname
            }
        })
        return args.username
    }
    catch(err) {
        console.log(err)
        if (err.code == "P2002") {
            return new ApolloError("User already exists")
        }
        else {
            return new ApolloError(err)
        }
    }    
}

module.exports = {
    createUser
}