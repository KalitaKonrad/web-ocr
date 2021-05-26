import { NextApiRequest, NextApiResponse } from "next";
import { bucketName, outputPrefix } from "../getOcr/[fileName]";

const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const bucket = storage.bucket(bucketName);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { fileName } = req.query;

  const [files] = await bucket.getFiles({
    directory: `${outputPrefix}/${fileName}/`,
  });

  const readOperations = files.map((file) => {
    const archivo = file.createReadStream();

    return new Promise((resolve) => {
      let buf = "";
      archivo
        .on("data", function (d) {
          buf += d;
        })
        .on("end", () => {
          resolve(buf);
        });
    });
  });
  const filesOutput = await Promise.all(readOperations);

  res.json(filesOutput);
  res.end();
};
