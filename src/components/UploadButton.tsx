import React from "react";
import { Button, Box } from "@chakra-ui/react";
import axios from "axios";

const UploadButton: React.FC = () => {
  const post = () => {
    axios
      .post("https://vision.googleapis.com/v1/files:asyncBatchAnnotate", {
        requests: [
          {
            inputConfig: {
              gcsSource: {
                uri: "gs://web-ocr-storage/Raport_z_ćwiczenia_wzór (3).pdf",
              },
              mimeType: "application/pdf",
            },
            features: [
              {
                type: "DOCUMENT_TEXT_DETECTION",
              },
            ],
            outputConfig: {
              gcsDestination: {
                uri: "gs://web-ocr-storage/outputs/",
              },
              batchSize: 1,
            },
          },
        ],
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box my={50} display={"flex"} justifyContent={"center"}>
      <Button
        w={400}
        isLoading={false}
        loadingText="Dodawanie"
        colorScheme="red"
        variant="outline"
        borderRadius={24}
        onClick={post}
      >
        Dodaj pliki
      </Button>
    </Box>
  );
};

export default UploadButton;
