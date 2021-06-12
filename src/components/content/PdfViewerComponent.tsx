import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, ButtonGroup, Flex, Icon, Text } from "@chakra-ui/react";
import { FaRegFilePdf } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import { AppContext } from "src/appContext/appContext";
import { useStore } from "../../store/useStore";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF_SCALE_FACTOR = 1.41;

const PdfViewerComponent = () => {
  const [numPages, setNumPages] = useState(null);
  const [url, setUrl] = useState(null);
  const { file, selectedPage, setSelectedPage } = useContext(AppContext);

  const canvas = useRef() as any;
  const documentDiv = useRef() as any;
  const canvasDiv = useRef() as any;
  const divWrappingPageRef = useRef() as any;

  const handleResize = () => {
    onCanvasLoadSuccess();
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setSelectedPage(1);
  };

  const previousPage = () => {
    setSelectedPage(selectedPage - 1);
  };

  const nextPage = () => {
    setSelectedPage(selectedPage + 1);
  };

  const onCanvasLoadSuccess = () => {
    if (canvas["current"] === undefined || documentDiv["current"] === undefined)
      return;
    canvas["current"].style.height = "100%";
    canvas["current"].style.width = "100%";
    documentDiv["current"].style.height = "100%";
    documentDiv["current"].style.width = "100%";

    const width = Math.min(
      Math.floor((window.innerHeight * 0.8) / PDF_SCALE_FACTOR),
      documentDiv["current"].getBoundingClientRect().width,
    );
    canvasDiv["current"].style.width = `${width}px`;
    canvasDiv["current"].style.height = `${width * PDF_SCALE_FACTOR}px`;
    documentDiv["current"].style.display = "flex";
    documentDiv["current"].style.justifyContent = "center";
    documentDiv["current"].style.alignItems = "center";
  };

  const selectedText = useStore((state) => state.selectedText);
  const responses = useStore((state) => state.responses);
  console.log("responses currently", responses);

  const [rectanglePercentageHeight, setRectanglePercentageHeight] = useState(0);
  const [rectanglePercentageTop, setRectanglePercentageTop] = useState(0);

  useEffect(() => {
    if (selectedText === "") {
      return;
    }

    const pageResponse = responses[selectedPage - 1];
    console.log("pageResponse", pageResponse);

    // TODO: IMPORTANT!!!!!!!!
    // TODO: CHANGE ALL THESE FOREACH LOOPS TO NORMAL FOR LOOP SINCE WE WANT TO BREAK
    // OUT OF ANY LOOP IF WE MATCH THE TEXT
    pageResponse.fullTextAnnotation.pages.forEach((page) => {
      page.blocks.forEach((block) =>
        block.paragraphs.forEach((par) => {
          const textInCertainParagraph = par.words
            .map((word) => word.symbols.map((symbol) => symbol.text).join(""))
            .join(" ");

          // TODO: check if selectedText phrase is contained in this paragraph (will not always work - for duplicate paragraphs it will return the first one)
          const containsSelectedPhrase = textInCertainParagraph.includes(
            selectedText,
          );

          if (containsSelectedPhrase) {
            const boundingBox = par.boundingBox;

            // we just need to know the minimum y coordinate and maximum for the height of our red rectangle highlighting
            // the edited paragraph. Only y because this rectangle is full width so x is not necessary
            const yCoords = boundingBox.normalizedVertices.map(
              (coords) => coords.y,
            );
            const minY = Math.min(...yCoords) * 100; // * 100 because it is normalizedValue so it's between [0, 1]
            const maxY = Math.max(...yCoords) * 100;

            setRectanglePercentageTop(minY);
            // top of rectangle element will be minY and height will be the length between maxY and minY
            const percentageHeight = Math.abs(maxY - minY);
            setRectanglePercentageHeight(percentageHeight);
          }
        }),
      );
    });
  }, [selectedText]);

  useEffect(() => {
    if (file) {
      setUrl(URL.createObjectURL(file));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [file]);

  const renderButtonGroup = () => (
    <ButtonGroup bottom={2} pos="absolute" variant="outline" spacing="6">
      <Button
        size="sm"
        isDisabled={selectedPage == 1}
        boxShadow="dark-sm"
        bg="gray.100"
        onClick={previousPage}
      >
        Prev
      </Button>
      <Button
        size="sm"
        isDisabled={selectedPage == numPages}
        boxShadow="dark-sm"
        bg="gray.100"
        onClick={nextPage}
      >
        Next
      </Button>
    </ButtonGroup>
  );

  return (
    <Flex maxh="100%" h="100%">
      {file ? (
        <Box h="100%" maxH="100%" position="relative">
          <Document
            inputRef={documentDiv}
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Box ref={divWrappingPageRef} position="relative">
              {selectedText && (
                <Box
                  position="absolute"
                  top={`${rectanglePercentageTop - 0.25}%`} // I subtract one percent so that the border doesn't cut the text in half
                  left={0}
                  height={`${
                    divWrappingPageRef?.current?.clientHeight
                      ? (rectanglePercentageHeight / 100) *
                          divWrappingPageRef.current.clientHeight +
                        5
                      : 0 // I add some pixels so that the border doesn't cut the text in half
                  }`}
                  zIndex={1000}
                  border="2px solid red"
                  w="100%"
                />
              )}
              <Page
                renderTextLayer={false}
                onLoadSuccess={onCanvasLoadSuccess}
                inputRef={canvasDiv}
                canvasRef={canvas}
                pageNumber={selectedPage}
              />
            </Box>
            {renderButtonGroup()}
          </Document>
        </Box>
      ) : (
        <Flex
          alignItems="center"
          justifyContent="center"
          mt={7}
          flexDirection="column"
        >
          <Text textAlign="center" mx={5}>
            Wybierz plik w formacje PDF ze swojego komputera. Aplikacja
            przeprowadzi automatyczną detekcję tekstu.
          </Text>
          <Flex flex={1} alignItems="center" justifyContent="center">
            <Icon boxSize="35%" color="red.300" as={FaRegFilePdf} />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default PdfViewerComponent;
