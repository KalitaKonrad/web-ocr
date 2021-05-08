import React, { useState } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import ContentContainer from "@components/content/ContentContainer";
import TextAreaComponent from "@components/content/TextAreaComponent";
import UploadButton from "@components/UploadButton";
import UploadFileModal from "@components/UploadFileModal";

const MainWrapper: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileName, setFileName] = useState("");
  const [detectedText, setDetectedText] = useState("");

  return (
    <>
      <Flex h="80%">
        <ContentContainer hasRightBorder />
        <ContentContainer>
          <TextAreaComponent detectedText={detectedText} />
        </ContentContainer>
      </Flex>
      <UploadButton {...{ onOpen, fileName }} />
      <UploadFileModal {...{ isOpen, onClose, setFileName, setDetectedText }} />
    </>
  );
};

export default MainWrapper;
