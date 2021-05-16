import React, { useContext, useEffect, useState } from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import SiteThumbnail from "@components/sideSection/SiteThumbnail";
import { AppContext } from "src/appContext/appContext";
import { Document, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PreviewListProps {
  sitesList?: string;
}

const PreviewList: React.FC<PreviewListProps> = () => {
  const { file } = useContext(AppContext);
  const [numPages, setNumPages] = useState<number>(0);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (file) {
      setUrl(URL.createObjectURL(file));
    }
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const generatePages = () => {
    const pageNumbers: Array<number> = [];
    for (let i = 1; i <= numPages; ++i) pageNumbers.push(i);
    return pageNumbers.map((pageNum) => <SiteThumbnail pageNumber={pageNum} />);
  };

  return (
    <Flex
      maxW={"90%"}
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
        {generatePages()}
      </Document>
    </Flex>
  );
};

export default PreviewList;
