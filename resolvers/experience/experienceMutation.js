const { ApolloError } = require('apollo-server');
const { uploadPhoto, addImageToExperienceHelper } = require('../../service/upload')
const { nanoid } = require('nanoid');

const createExperience = async (parent, args, { prisma }) => {
    try {
        const unique_nano_id = nanoid(12)
        const experience = await prisma.experiences.create({
            data: {
                title: args.title,
                summary: args.summary,
                miles: args.miles,
                elevation: args.elevation,
                climbing: args.climbing,
                cost: args.cost,
                difficulty: args.difficulty,
                public_identifier: unique_nano_id,
                users: {
                    connect: {
                        pkuser: args.pkuser
                    }
                },
                experience_locations: {
                    create: {
                        lat: args.lat,
                        lng: args.lng
                    },
                },
            },
            include: {
                experience_locations: true,
                experience_images: {
                    include: {
                        images: true
                    }
                },
            },
        })

        if (args.tags) {
            args.tags.map(async (tag) => {
                await prisma.experience_tags.create({
                    data: {
                        tags: {
                            connect: {
                                pktag: tag
                            }
                        },
                        experiences: {
                            connect: {
                                pkexperience: experience.pkexperience
                            }
                        }
                    }
                })
            })
        }

        // for loop through images, and upload each individual image
        if (args.images) {
            await Promise.all(args.images[0].map(async (image) => {
                console.log(image)
                const { createReadStream, filename } = await image

                await uploadPhoto(createReadStream, filename).then(data => {
                    addImageToExperienceHelper(prisma, experience.pkexperience, data.Key, data.Location, args.caption, args.pkuser)
                })
            }))
        }

        // if (args.images) {
        //     args.images.map(async (image) => {
        //         const { createReadStream, filename } = await image
        //         console.log(createReadStream)
        //         await uploadPhoto(createReadStream, filename).then(data => {
        //             addImageToExperienceHelper(prisma, experience.pkexperience, data.Key, data.Location, args.caption, args.pkuser)
        //         })
        //     })
        // }
        return experience
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }    
}

const addImageToExperience = async (parent, args, { prisma }) => {
    try {

        await Promise.all(args.images[0].map(async (image) => {
            const { createReadStream, filename } = await image

            await uploadPhoto(createReadStream, filename).then(data => {
                addImageToExperienceHelper(prisma, args.pkexperience, data.Key, data.Location, args.caption, args.pkuser)
            })
            .catch(err => {
                console.error(err)
            })
        }))

        return "Added image to experience"
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const addTagToExperience = async (parent, args, { prisma }) => {
    try {
        const tag = await prisma.experience_tags.create({
            data: {
                tags: {
                    connect: {
                        pktag: args.pktag
                    }
                },
                experiences: {
                    connect: {
                        pkexperience: args.pkexperience
                    }
                }
            }
        })
        return tag
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const deleteTagFromExperience = async (parent, args, { prisma }) => {
    try {
        const delete_tag = await prisma.experience_tags.delete({
            where: {
                pkexperience_tag: args.pkexperience_tag
            }
        })
        return delete_tag
    }
    catch {
        console.error(err)
        return new ApolloError(err)
    }
}

const saveExperience = async (parent, args, { prisma }) => {
    try {
        const saved_experience = await prisma.saved_experiences.create({
            data: {
                users: {
                    connect: {
                        pkuser: args.saving_user
                    }
                },
                experiences: {
                    connect: {
                        pkexperience: args.saving_experience
                    }
                }
            },
            include: {
                users: true,
                experiences: true
            }
        })
        return saved_experience
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const unsaveExperience = async (parent, args, { prisma }) => {
    try {
        const saved_experience = await prisma.saved_experiences.delete({
            where: {
                pksaved_experience: args.pksaved_experience
            }
        })
        return saved_experience
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const visitExperience = async (parent, args, { prisma }) => {
    try {
        const visited_experience = await prisma.visited_experiences.create({
            data: {
                users: {
                    connect: {
                        pkuser: args.visiting_user
                    }
                },
                experiences: {
                    connect: {
                        pkexperience: args.visiting_experience
                    }
                }
            },
            include: {
                users: true,
                experiences: true
            }
        })
        return visited_experience
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const reviewExperience = async (parent, args, { prisma }) => {
    try {
        const review_experience = await prisma.review_experiences.create({
            data: {
                rating: args.rating,
                content: args.content,
                users: {
                    connect: {
                        pkuser: args.review_user
                    }
                },
                experiences: {
                    connect: {
                        pkexperience: args.review_experience
                    }
                }
            },
            include: {
                users: true,
                experiences: true
            }
        })

        // TODO: Need to link these experience images with the review
        
        // for loop through images, and upload each individual image
        if (args.images) {
            for (var i = 0; i < args.images.length; i++) {
                var img = args.images[i]

                // Wait for image to upload to bucket, then add to SQL
                await uploadPhoto(img).then(data => {
                    addImageToExperienceHelper(prisma, args.review_experience, data.Key, data.Location, args.caption, args.review_user)
                })
                .catch(err => {
                    console.error(err)
                })
            }
        }
        
        return review_experience
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

const deleteReviewExperience = async(parent, args, { prisma }) => {
    try {
        const review_experience = await prisma.review_experiences.delete({
            where: {
                pkreview_experience: args.pkreview_experience
            }
        })
        return review_experience
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}



const unvisitExperience = async (parent, args, { prisma }) => {
    try {
        const visited_experience = await prisma.visited_experiences.delete({
            where: {
                pkvisited_experience: args.pkvisited_experience
            }
        })
        return visited_experience
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}


const deleteExperience = async(parent, args, { prisma }) => {
    try {
        await prisma.experience_locations.delete({
            where: {
                pkexperience_location: args.pkexperience
            }
        })

        const experience = await prisma.experiences.delete({
            where: {
                pkexperience: args.pkexperience
            }
        })
        return experience
    }
    catch(err) {
        console.error(err)
        return new ApolloError(err)
    }
}

module.exports = {
    createExperience,
    addImageToExperience,
    addTagToExperience,
    deleteTagFromExperience,
    saveExperience,
    unsaveExperience,
    visitExperience,
    unvisitExperience,
    reviewExperience,
    deleteReviewExperience,
    deleteExperience
}
