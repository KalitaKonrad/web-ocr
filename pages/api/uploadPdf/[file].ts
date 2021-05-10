import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { Storage } = require("@google-cloud/storage");

  // The ID of your GCS bucket
  const bucketName = "web-ocr-storage";

  // The path to your file to upload
  const filePath = req.query.file;
  console.log(filePath);
  // The new ID for your GCS file
  const destFileName = req.query.file;

  // Imports the Google Cloud client library
  const storage = new Storage();

  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
};
