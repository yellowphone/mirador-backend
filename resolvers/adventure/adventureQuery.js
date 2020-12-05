const { ApolloError } = require('apollo-server');

const findAdventureById = async(parent, args, { prisma }) => {
    try {
        const results = await prisma.adventures.findOne({
            where: {
                pkadventure: args.pkadventure
            },
            include: {
                locations: true,
                adventure_images: {
                    include: {
                        images: true
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

const findAdventureByCoordinates = async(parent, args, { prisma }) => {
    try {
        /**
         * Want to return specific object type, but can only be done in TypeScript Generic
         * Pretty sure Bailey wants to turn into TS so we can get to that when we get there
         * 
         * const result = await prisma.$queryRaw<User[]>('SELECT * FROM User;')
         * */
        
        // Look into more efficient methods if possible for getting GPS coordinates
        // 3959 is miles, 6371 is kms
        const results = await prisma.$queryRaw(
            `SELECT * FROM (
                (SELECT *,( 3959 * acos( cos( radians($1) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians($2) ) + sin( radians($3) ) * sin( radians( lat ) ) ) ) AS distance FROM locations) newTable
                    INNER JOIN
                adventures a ON newTable.fk_adventure_location = a.pkadventure
            ) al
            WHERE distance < 50
            ORDER BY distance
            LIMIT 20;`,
            args.lat,
            args.lng,
            args.lat
        )
        console.log(results);
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
