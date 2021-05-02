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
  const fileName = "lorem-ipsum.pdf";
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

  const [operation] = await client.asyncBatchAnnotateFiles(request);
  const [filesResponse] = await operation.promise();
  const destinationUri =
    filesResponse.responses[0].outputConfig.gcsDestination.uri;
  console.log("Json saved to: " + destinationUri);
  console.log("filesResponse ===> ", filesResponse);
  console.log("operation name ===> ", operation.name);

  const words = operation.name.split("/");
  console.log(words[3]);
  const operationId = words[3];

  const axios = require("axios");

  axios
    .get(`https://vision.googleapis.com/v1/operations/${operationId}`)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};
