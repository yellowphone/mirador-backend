const { ApolloError } = require('apollo-server');

const findExperienceById = async(parent, args, { prisma }) => {
    try {
        const results = await prisma.experiences.findOne({
            where: {
                pkexperience: args.pkexperience
            },
            include: {
                experience_locations: true,
                experience_images: {
                    include: {
                        images: true
                    }
                },
                review_experiences: {
                    include: {
                        users: true,
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

const findExperienceByTitle = async(parent, args, { prisma }) => {
    try {
        const results = await prisma.experiences.findMany({
            where: {
                title: {
                    contains: args.title
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

const findExperienceByCoordinates = async(parent, args, { prisma }) => {
    try {
        // const result = await prisma.$queryRaw<User[]>('SELECT * FROM User;')        
        // 3959 is miles, 6371 is kms
        // const results = await prisma.$queryRaw(
        //     `
        //     SELECT * FROM (SELECT * , ( 3959 * acos( cos( radians($1) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians($2) ) + sin( radians($3) ) * sin( radians( lat ) ) ) ) AS distance FROM locations) newTable
        //     WHERE distance < 50
        //     `,
        //     args.lat,
        //     args.lng,
        //     args.lat
        // )

        const results = await prisma.$queryRaw(
            `SELECT * FROM (
                (SELECT *,( 3959 * acos( cos( radians($1) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians($2) ) + sin( radians($3) ) * sin( radians( lat ) ) ) ) AS distance FROM experience_locations) newTable
                    INNER JOIN
                experiences a ON newTable.fk_experience_location = a.pkexperience
            ) al
            WHERE distance < 50
            ORDER BY distance;`,
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
    findExperienceById,
    findExperienceByTitle,
    findExperienceByCoordinates
}
