import React, { useState, useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
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
  const inputRef = useRef() as any; // idk

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
    canvasDiv["current"].style.height = "100%";
    canvasDiv["current"].style.width = `${Math.floor(
      canvasDiv["current"].getBoundingClientRect().height / 1.4142857142857,
    )}px`;

    if (
      canvasDiv["current"].getBoundingClientRect().height >=
      canvasDiv["current"].getBoundingClientRect().width * 1.41
    ) {
      console.log("witam");
      canvasDiv["current"].style.height = `${Math.floor(
        canvasDiv["current"].getBoundingClientRect().width * 1.4142857142857,
      )}px`;
    }
    documentDiv["current"].style.maxHeight = "100%";
    documentDiv["current"].style.maxWidth = "100%";
    documentDiv["current"].style.height = "100%";
    documentDiv["current"].style.width = "100%";
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

  return (
    <Box h="100%">
      {file ? (
        <>
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
          </Document>

          <div>
            <button
              disabled={pageNumber <= 1}
              type="button"
              onClick={previousPage}
            >
              Previous
            </button>

            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>Witam dodaj plik</p>
      )}
    </Box>
  );
};

export default PdfViewerComponent;
