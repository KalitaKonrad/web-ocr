import React, { useContext, useEffect, useState } from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import MyPdfDocument from "@components/content/MyPdfDocument";
import dynamic from "next/dynamic";
import { AppContext } from "../../appContext/appContext";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  },
);

const DownloadButton: React.FC = () => {
  const [isDocumentGenerated, setIsDocumentGenerated] = useState(false);
  const { file } = useContext(AppContext);

  return (
    <Box
      marginBottom={4}
      display={"flex"}
      justifyContent="center"
      alignItems="center"
    >
      {!isDocumentGenerated ? (
        <Button
          w={400}
          loadingText="Generowanie"
          colorScheme="red"
          variant="outline"
          borderRadius={24}
          onClick={() => setIsDocumentGenerated(true)}
          spinnerPlacement="start"
        >
          Wygeneruj link do pobrania
        </Button>
      ) : (
        <Button
          w={400}
          loadingText="Generowanie"
          colorScheme="red"
          variant="outline"
          borderRadius={24}
          onClick={() => setIsDocumentGenerated(false)}
          spinnerPlacement="start"
        >
          <PDFDownloadLink
            document={(<MyPdfDocument />) as any}
            fileName={file?.name ? `${file.name}.pdf` : "example.pdf"}
          >
            {({ loading }) =>
              loading ? "ładowanie dokumentu..." : "Pobierz PDF!"
            }
          </PDFDownloadLink>
        </Button>
      )}
    </Box>
  );
};

export default DownloadButton;
