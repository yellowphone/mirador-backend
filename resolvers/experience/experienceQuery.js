const { ApolloError } = require('apollo-server');

const findExperienceById = async(parent, args, { prisma }) => {
    try {
        const results = await prisma.experiences.findUnique({
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
                },
                experience_tags: {
                    include: {
                        tags: true
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

        // SQL query that grabs image url for experience
        // Will want to clean up, but we will want to wait for Prisma geolocation query is available
        const results = await prisma.$queryRaw(
            `SELECT * FROM (
                (SELECT *,( 3959 * acos( cos( radians($1) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians($2) ) + sin( radians($3) ) * sin( radians( lat ) ) ) ) AS distance FROM experience_locations) newTable

                    INNER JOIN

                experiences a ON newTable.fk_experience_location = a.pkexperience

                    INNER JOIN

                (
                    experience_images ei 
                        INNER JOIN 
                    images i on i.pkimage = ei.adding_image
                ) imageURLTable ON imageURLTable.adding_experience = a.pkexperience

            ) al
            WHERE distance < 50
            ORDER BY distance;`,
            args.lat,
            args.lng,
            args.lat
        )

        /**
         * After grabbing raw SQL data, we are parsing the data
         * here into more organized dictionary structure. 
         * 
         * This parsing of data is designed to build and organize 
         * an image URL array for each experience.
         */
        var dictionary = {}
        var appendedResults = []

        results.map((item) => {
            if (item.fk_experience_location in dictionary) {
                dictionary[item.fk_experience_location].url.push(item.url)
            }
            else {
                dictionary[item.fk_experience_location] = {
                    lat: item.lat,
                    lng: item.lng,
                    fk_experience_location: item.fk_experience_location,
                    distance: item.distance,
                    title: item.title,
                    summary: item.summary,
                    created_on: item.created_on,
                    miles: item.miles,
                    elevation: item.elevation,
                    climbing: item.climbing,
                    difficulty: item.difficulty,
                    public_identifier: item.public_identifier,
                    url: [item.url]
                }
            }
        })

        for (var key in dictionary) {
            appendedResults.push(dictionary[key])
        }

        console.log(appendedResults)
        return appendedResults;
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const findExperienceByPublicIdentifier = async(parent, args, { prisma }) => {
    try {
        const results = await prisma.experiences.findUnique({
            where: {
                public_identifier: args.public_identifier
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
                },
                experience_tags: {
                    include: {
                        tags: true
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

module.exports = {
    findExperienceById,
    findExperienceByTitle,
    findExperienceByCoordinates,
    findExperienceByPublicIdentifier
}
