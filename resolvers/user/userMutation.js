const { ApolloError } = require('apollo-server');

const createUser = async (parent, args, { prisma }) => {
    try {
        const user = await prisma.users.create({
            data: {
                username: args.username,
                email: args.email,
                password: args.password,
                firstname: args.firstname,
                lastname: args.lastname
            }
        })
        return user.pkuser
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