import React, { useState } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import ContentContainer from "@components/content/ContentContainer";
import TextAreaComponent from "@components/content/TextAreaComponent";
import UploadButton from "@components/UploadButton";
import UploadFileModal from "@components/UploadFileModal";
import PdfViewerComponent from "./PdfViewerComponent";

const MainWrapper: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileName, setFileName] = useState("");
  const [detectedText, setDetectedText] = useState("");

  return (
    <>
      <Flex h="80%">
        <ContentContainer hasRightBorder>
          <PdfViewerComponent />
        </ContentContainer>
        <ContentContainer>
          <TextAreaComponent detectedText={detectedText} />
        </ContentContainer>
      </Flex>
      <UploadButton {...{ onOpen }} />
      <UploadFileModal
        {...{ isOpen, onClose, setFileName, setDetectedText, fileName }}
      />
    </>
  );
};

export default MainWrapper;
