import React, { useState, useEffect, useRef } from "react";
import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF_SCALE_FACTOR = 1.4;

const PdfViewerComponent = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(0);
  const [url, setUrl] = useState(null);

  const canvas = useRef() as any;
  const documentDiv = useRef() as any;
  const canvasDiv = useRef() as any;

  const handleResize = () => {
    setWidth(window.innerWidth);
    onCanvasLoadSuccess();
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  const onCanvasLoadSuccess = () => {
    if (canvas["current"] === undefined || documentDiv["current"] === undefined)
      return;
    canvas["current"].style.height = "100%";
    canvas["current"].style.width = "100%";
    documentDiv["current"].style.height = "100%";
    documentDiv["current"].style.width = "100%";

    const width = Math.min(
      Math.floor(
        documentDiv["current"].getBoundingClientRect().height /
          PDF_SCALE_FACTOR,
      ),
      documentDiv["current"].getBoundingClientRect().width,
    );
    canvasDiv["current"].style.width = `${width}px`;
    canvasDiv["current"].style.height = `${width * PDF_SCALE_FACTOR}px`;
    documentDiv["current"].style.display = "flex";
    documentDiv["current"].style.justifyContent = "center";
    documentDiv["current"].style.alignItems = "center";
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    if (file) {
      setUrl(URL.createObjectURL(file));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [file]);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderButtonGroup = () => (
    <ButtonGroup bottom={2} pos="absolute" variant="outline" spacing="6">
      <Button
        size="sm"
        isDisabled={pageNumber == 1}
        boxShadow="dark-sm"
        bg="gray.100"
        onClick={previousPage}
      >
        Prev
      </Button>
      <Button
        size="sm"
        isDisabled={pageNumber == numPages}
        boxShadow="dark-sm"
        bg="gray.100"
        onClick={nextPage}
      >
        Next
      </Button>
    </ButtonGroup>
  );

  return (
    <Box h="100%">
      {file ? (
        <Box h="100%" position="relative">
          <Document
            inputRef={documentDiv}
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              renderTextLayer={false}
              onLoadSuccess={onCanvasLoadSuccess}
              inputRef={canvasDiv}
              canvasRef={canvas}
              pageNumber={pageNumber}
            />
            {renderButtonGroup()}
          </Document>
        </Box>
      ) : (
        <Flex alignItems="center" justifyContent="center" mt={7}>
          <Text textAlign="center" mx={5}>
            Wybierz plik w formacje PDF ze swojego komputera. Aplikacja
            przeprowadzi automatyczną detekcję tekstu.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default PdfViewerComponent;
