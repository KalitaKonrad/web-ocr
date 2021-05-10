const { Storage } = require("@google-cloud/storage");

export default async (req, res) => {
  // The ID of your GCS bucket
  const bucketName = "web-ocr-storage";

  // The path to your file to upload
  const filePath = "lorem-ipsum.pdf";

  // The new ID for your GCS file
  const destFileName = "lorem-ipsum.pdf";

  // Imports the Google Cloud client library
  const storage = new Storage();

  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
};
