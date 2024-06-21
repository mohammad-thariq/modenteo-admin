import { uploadFile } from "react-s3";
import { BaseUrls } from "../../env";
window.Buffer = window.Buffer || require("buffer").Buffer;

export const uploadFiles = async (file) => {
    const accessKey = BaseUrls.AWS_ACCESS_KEY_ID;
    const secretAccessKey = BaseUrls.AWS_SECRET_ACCESS_KEY;
    const config = {
        bucketName: "modenteo-file",
        dirName: `products/gallery`,
        region: "eu-north-1",
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    };
    try {
        const data = await uploadFile(file, config);
        console.log(data, "datadatadata")
        return data?.location;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
