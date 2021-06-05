import React, { useContext, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
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
  const { file, ocrCompleted } = useContext(AppContext);

  return (
    <Box
      marginBottom={4}
      display="flex"
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
          disabled={!ocrCompleted}
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
          <Box flex={1}>
            <PDFDownloadLink
              document={(<MyPdfDocument />) as any}
              fileName={`${file?.name}.pdf`}
            >
              {({ loading }) =>
                loading ? "ładowanie dokumentu..." : <Text>Pobierz PDF</Text>
              }
            </PDFDownloadLink>
          </Box>
        </Button>
      )}
    </Box>
  );
};

export default React.memo(DownloadButton);
