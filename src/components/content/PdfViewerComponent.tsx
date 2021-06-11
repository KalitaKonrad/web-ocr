import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
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

  useEffect(() => {
    const words = selectedText.split(" ");
    console.log("responses in here", responses);

    const pageResponse = responses[selectedPage];
    console.log("pageResponse", pageResponse);

    // Object.values(responses).forEach((arr) => {
    //   console.log("arr", arr);
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   arr.forEach((responseObj) => {
    //     if (responseObj.fullTextAnnotation.text.includes(selectedText)) {
    //       console.log("text", selectedText);
    //       console.log("found in", responseObj.fullTextAnnotation.text);
    //     }
    //   });
    // });
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
            <Page
              renderTextLayer={false}
              onLoadSuccess={onCanvasLoadSuccess}
              inputRef={canvasDiv}
              canvasRef={canvas}
              pageNumber={selectedPage}
            />
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
