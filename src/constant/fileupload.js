import AWS from "aws-sdk";
import { BaseUrls } from "../../env"; // Import your environment configuration if needed

// Initialize AWS SDK with your credentials
const s3 = new AWS.S3({
    accessKeyId: BaseUrls.AWS_ACCESS_KEY_ID,
    secretAccessKey: BaseUrls.AWS_SECRET_ACCESS_KEY,
    region: "eu-north-1", // Replace with your AWS region
});

// Function to upload file to S3 bucket
export const uploadFiles = async (file) => {
    const bucketName = "modenteo-file"; // Replace with your S3 bucket name
    const dirName = "products/gallery"; // Directory inside the bucket
    const key = `${dirName}/${Date.now().toString()}-${file.name}`; // Unique key for the file

    const params = {
        Bucket: bucketName,
        Key: key,
        Body: file.data, // Assuming file.data contains the actual file data
        ACL: "public-read", // Set appropriate ACL permissions
        ContentType: file.type, // Content type of the file
    };

    try {
        const data = await s3.upload(params).promise();
        console.log("File uploaded successfully:", data.Location);
        return data.Location; // Return the URL of the uploaded file
    } catch (err) {
        console.error("Error uploading file:", err);
        throw err;
    }
};
