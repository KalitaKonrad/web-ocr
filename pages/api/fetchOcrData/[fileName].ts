import { NextApiRequest, NextApiResponse } from "next";
import { bucketName, outputPrefix } from "../getOcr/[fileName]";

const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const bucket = storage.bucket(bucketName);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { fileName } = req.query;
  // res.json(fileName);

  if (typeof fileName === "string") {
    const [files] = await bucket.getFiles({
      directory: `${outputPrefix}/${fileName}/`,
    });

    const output = [];
    const fs = require("fs");

    console.log("files", files);
    files.forEach((file) => {
      const archivo = file.createReadStream();
      let buf = "";
      archivo
        .on("data", function (d) {
          buf += d;
        })
        .on("end", function () {
          console.log(buf);
          output.push(buf);
          console.log("End");
        });
    });

    res.json(output);
    res.end();
    return;
  }

  // files.forEach((file) => {
  //   console.log("Reading: " + file.name);
  //   const archivo = file.createReadStream();
  //   console.log("Concat Data");
  //   let buf = "";
  //   archivo
  //     .on("data", function (d) {
  //       buf += d;
  //     })
  //     .on("end", function () {
  //       console.log(buf);
  //       console.log("End");
  //     });
  // });

  res.json("error");
};
