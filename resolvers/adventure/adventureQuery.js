const { ApolloError } = require('apollo-server');

const findAdventureById = async(parent, args, { prisma }) => {
    try {
        const results = await prisma.adventures.findOne({
            where: {
                pkadventure: args.pkadventure
            },
            include: {
                locations: true,
            },
        })
        return results
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const findAdventureByCoordinates = async(parent, args, { prisma }) => {
    try {
        // 3959 is miles, 6371 is kms
        const results = await prisma.$queryRaw(
            `select * from (
            SELECT  *, ( 3959 * acos( cos( radians(${args.lat}) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(${args.lng}) ) + sin( radians(${args.lat}) ) * sin( radians( lat ) ) ) ) AS distance 
            FROM locations
            ) al
            where distance < 50
            ORDER BY distance
            LIMIT 20;`
        )
        return results;
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

module.exports = {
    findAdventureById,
    findAdventureByCoordinates
}
