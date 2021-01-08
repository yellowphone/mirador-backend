const fs = require('fs');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const uploadPhoto = async (imageFile) => {

    const { createReadStream, filename } = await imageFile;

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    });

    return new Promise((resolve, reject) => {
        const val = uuidv4();

        // Uploading files to the bucket
        s3.upload({
            Bucket: process.env.BUCKET_NAME,
            Key: `${val}-${filename}`, // File name you want to save as in S3
            Body: createReadStream()
        }, function(err, data) {
            if (err) {
                throw err;
            }
            if (data) {
                console.log(`File uploaded successfully. ${data.Location}`);
                return resolve(data);
            }

        });
    })
}

const addImageToExperienceHelper = async(prisma, pkexperience, Key, Location, caption, pkuser) => {
    const experience_image = await prisma.experience_images.create({
        data: {
            experiences: {
                connect: {
                    pkexperience: pkexperience
                }
            },
            images: {
                create: {
                    identifier: Key,
                    url: Location,
                    caption: caption,
                    users: {
                        connect: {
                            pkuser: pkuser
                        }
                    }
                }
            }
        }
    })
    console.log(experience_image)
}

module.exports = {
    uploadPhoto,
    addImageToExperienceHelper
}