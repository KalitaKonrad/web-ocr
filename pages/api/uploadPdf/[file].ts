import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("witam");
  const { Storage } = require("@google-cloud/storage");

  // The ID of your GCS bucket
  const bucketName = "web-ocr-storage";

  // The path to your file to upload
  const filePath = req.query.file;

  // The new ID for your GCS file
  const destFileName = req.query.file;

  // Imports the Google Cloud client library
  const storage = new Storage();

  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
};
