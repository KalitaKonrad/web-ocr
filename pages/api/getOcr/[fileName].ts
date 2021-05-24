import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const vision = require("@google-cloud/vision").v1;

  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  // Bucket where the file resides
  const bucketName = "web-ocr-storage";
  // Path to PDF file within bucket
  const { fileName } = req.query;
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
  const features = [{ type: "TEXT_DETECTION" }];
  const request = {
    requests: [
      {
        inputConfig: inputConfig,
        features: features,
        outputConfig: outputConfig,
      },
    ],
  };

  const [result] = await client.batchAnnotateFiles(request);

  // Process the results, just get the first result, since only one file was sent in this
  // sample.
  const responses = result.responses[0].responses;
  console.log("HEHEE : ", responses);
  // console.log(
  //   "HEHEE : ",
  //   responses[0].fullTextAnnotation.pages[0].blocks[0].paragraphs[0],
  //   responses[0].fullTextAnnotation.pages[0].blocks[0].boundingBox[0],
  // );
  res.json(responses);
};
