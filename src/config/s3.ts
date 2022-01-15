import S3 from "aws-sdk/clients/s3";
import random from "randomstring";
require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME!;
const region = process.env.AWS_BUCKET_REGION!;
const accessKeyId = process.env.AWS_ACCESS_KEY!;
const secretAccessKey = process.env.AWS_SECRET_KEY!;

const client = new S3({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * Uploads S3 Objects
 * @param files
 * @returns Promise
 */

const uploadFiles = (files) => {
  const promises: Promise<any>[] = [];
  files.map((item) => {
    const uploadParams = {
      Bucket: bucketName,
      Body: item.buffer,
      Key: random.generate(),
      ContentType: item.mimetype,
    };

    promises.push(client.upload(uploadParams).promise());
  });

  return Promise.all(promises);
};

/**
 * Deletes S3 Objects
 * @param files Array of Object Keys
 * @returns Promise
 */
const deleteFiles = (keys: string[]) => {
  const promises: Promise<any>[] = [];
  keys.map((item) => {
    const deleteParams = {
      Bucket: bucketName,
      Key: item,
    };

    promises.push(client.deleteObject(deleteParams).promise());
  });

  return Promise.all(promises);
};

const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return client
    .getObject(downloadParams)
    .createReadStream()
    .on("error", (err) => {
      return new Error(err.message);
    });
};

/**
 * Generate the SignedURL for an Object
 * @param Object key
 * @returns url SignedURL
 */
const getSignedUrl = (key) => {
  const signedUrlExpireSeconds = 60 * 5;

  const url = client.getSignedUrl("getObject", {
    Bucket: bucketName,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
  return url;
};

export { bucketName, uploadFiles, getFileStream, getSignedUrl, deleteFiles };
