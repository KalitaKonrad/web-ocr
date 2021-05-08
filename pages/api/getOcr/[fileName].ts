import type { NextApiRequest, NextApiResponse } from "next";
// import account from "../../secrets/account.json";

// console.log(account);
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const account = require(path.resolve("secrets/account.json"));

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // res.status(200).json({ name: "John Doe" });
  // Imports the Google Cloud client libraries
  const vision = require("@google-cloud/vision").v1;

  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  // Bucket where the file resides
  const bucketName = "web-ocr-storage";
  // Path to PDF file within bucket
  const { fileName } = req.query;
  console.log("===>", fileName);
  // The folder to store the results
  const outputPrefix = "outputs";

  const gcsSourceUri = `gs://${bucketName}/${fileName}`;
  const gcsDestinationUri = `gs://${bucketName}/${outputPrefix}/`;

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

  // Make the synchronous batch request.
  // const [operation] = await client.asyncBatchAnnotateFiles(request);

  const [result] = await client.batchAnnotateFiles(request);

  // Process the results, just get the first result, since only one file was sent in this
  // sample.
  const responses = result.responses[0].responses;
  res.json(responses);
};
