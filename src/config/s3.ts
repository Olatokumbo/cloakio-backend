import S3 from "aws-sdk/clients/s3";
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

const uploadFiles = (files) => {
  const promises: Promise<any>[] = [];

  files.map((item) => {
    const uploadParams = {
      Bucket: bucketName,
      Body: JSON.stringify(item),
      Key: item.filename,
      ContentType: item.mimetype,
    };

    promises.push(client.upload(uploadParams).promise());
  });

  return Promise.all(promises);
};


// downloads a file from s3
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

export { bucketName, uploadFiles, getFileStream };
