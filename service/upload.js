const fs = require('fs');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const uploadPhoto = async (imageFile) => {

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    });

    return new Promise((resolve, reject) => {
        const fileContent = Buffer.from(imageFile, 'base64');
        var val = uuidv4() + '.jpg';

            // Uploading files to the bucket
        s3.upload({
            Bucket: process.env.BUCKET_NAME,
            Key: val, // File name you want to save as in S3
            Body: fileContent
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

const addImageToAdventure = async(prisma, pkadventure, Key, Location, caption, pkuser) => {
    const adventure_image = await prisma.adventure_images.create({
        data: {
            adventures: {
                connect: {
                    pkadventure: pkadventure
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
    console.log(adventure_image)
}

module.exports = {
    uploadPhoto,
    addImageToAdventure
}