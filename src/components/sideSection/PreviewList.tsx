import React, { useContext, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import SiteThumbnail from "@components/sideSection/SiteThumbnail";
import { AppContext } from "src/appContext/appContext";
import { Document, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PreviewListProps {
  sitesList?: string;
}

const PreviewList: React.FC<PreviewListProps> = () => {
  const { file } = useContext(AppContext);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (file) {
      setUrl(URL.createObjectURL(file));
    }
  }, [file]);

  const onDocumentLoadSuccess = () => {
    console.log("witam pdf");
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      flex={1}
      overflowY="scroll"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <SiteThumbnail></SiteThumbnail>
      </Document>
    </Flex>
  );
};

export default PreviewList;
