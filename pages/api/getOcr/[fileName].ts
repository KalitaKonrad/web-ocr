import type { NextApiRequest, NextApiResponse } from "next";

export const outputPrefix = "outputs";
export const bucketName = "web-ocr-storage";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const vision = require("@google-cloud/vision").v1;

  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  // Bucket where the file resides
  // Path to PDF file within bucket
  const { fileName } = req.query;
  // The folder to store the results
  let fileNameWithoutExtension = "";
  if (typeof fileName === "string") {
    fileNameWithoutExtension = fileName.split(".")[0];
  }

  const gcsSourceUri = `gs://${bucketName}/${fileName}`;
  const gcsDestinationUri = `gs://${bucketName}/${outputPrefix}/${fileNameWithoutExtension}/`;

  const inputConfig = {
    // Supported mime_types are: 'application/pdf' and 'image/tiff'
    mimeType: "application/pdf",
    gcsSource: {
      uri: gcsSourceUri,
    },
  };
  const outputConfig = {
    gcsDestination: {
      uri: gcsDestinationUri,
    },
  };
  const features = [{ type: "DOCUMENT_TEXT_DETECTION" }];
  const request = {
    requests: [
      {
        inputConfig: inputConfig,
        features: features,
        outputConfig: outputConfig,
      },
    ],
  };

  const [operation] = await client.asyncBatchAnnotateFiles(request);
  const [filesResponse] = await operation.promise();

  res.json(operation);
};
