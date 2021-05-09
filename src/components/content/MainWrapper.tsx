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
  const [file, setFile] = useState(null);

  return (
    <>
      <Flex h="80%">
        <ContentContainer hasRightBorder>
          <PdfViewerComponent file={file} />
        </ContentContainer>
        <ContentContainer>
          <TextAreaComponent detectedText={detectedText} />
        </ContentContainer>
      </Flex>
      <UploadButton {...{ onOpen }} />
      <UploadFileModal
        {...{ isOpen, onClose, setFile, setDetectedText, fileName }}
      />
    </>
  );
};

export default MainWrapper;
