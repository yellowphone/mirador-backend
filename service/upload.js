const fs = require('fs');
const AWS = require('aws-sdk');

const uploadPhoto = async (imageFile) => {

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    });

    // Read content from the file
    const fileContent = fs.readFileSync(imageFile);

    // Setting up S3 upload parameters
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: 'pic.jpg', // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        return data.Location
    });
}

module.exports = {
    uploadPhoto
}
// when you get a pic from request body, upload and return image url, create Image record and store in db
