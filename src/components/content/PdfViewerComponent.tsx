import React, { useState, useEffect, useRef } from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewerComponent = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(0);
  const [url, setUrl] = useState(null);

  const canvas = useRef() as any; // idk
  const documentDiv = useRef() as any; // idk
  const canvasDiv = useRef() as any; // idk

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
    canvas["current"].style.height = "100%";
    canvas["current"].style.width = "100%";
    documentDiv["current"].style.height = "100%";
    documentDiv["current"].style.width = "100%";

    const width = Math.min(
      Math.floor(
        documentDiv["current"].getBoundingClientRect().height / 1.4142857142857,
      ),
      documentDiv["current"].getBoundingClientRect().width,
    );
    canvasDiv["current"].style.width = `${width}px`;
    canvasDiv["current"].style.height = `${width * 1.4142857142857}px`;

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
            <ButtonGroup
              bottom={5}
              pos="absolute"
              variant="outline"
              spacing="6"
            >
              <Button
                isDisabled={pageNumber == 1}
                boxShadow="dark-lg"
                bg="gray.100"
                onClick={previousPage}
              >
                Prev
              </Button>
              <Button
                isDisabled={pageNumber == numPages}
                boxShadow="dark-lg"
                bg="gray.100"
                onClick={nextPage}
              >
                Next
              </Button>
            </ButtonGroup>
          </Document>
        </Box>
      ) : (
        <p>Witam dodaj plik</p>
      )}
    </Box>
  );
};

export default PdfViewerComponent;
