import React, { useState } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import ContentContainer from "@components/content/ContentContainer";
import TextAreaComponent from "@components/content/TextAreaComponent";
import UploadButton from "@components/UploadButton";
import UploadFileModal from "@components/UploadFileModal";
import Alert from "@components/shared/Alert";

const MainWrapper: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileName, setFileName] = useState("");
  const [detectedText, setDetectedText] = useState("");

  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  return (
    <>
      <Flex h="80%">
        <ContentContainer hasRightBorder />
        <ContentContainer>
          <TextAreaComponent detectedText={detectedText} />
        </ContentContainer>
      </Flex>
      <UploadButton {...{ onOpen }} />
      <UploadFileModal
        {...{
          isOpen,
          onClose,
          setFileName,
          setDetectedText,
          fileName,
          setIsAlertOpen,
        }}
      />
      {isAlertOpen && (
        <Alert isAlertOpen={isAlertOpen} setIsAlertOpen={setIsAlertOpen} />
      )}
    </>
  );
};

export default MainWrapper;
