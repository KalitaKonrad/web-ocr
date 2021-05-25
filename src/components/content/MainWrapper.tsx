import React, { useState } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import ContentContainer from "@components/content/ContentContainer";
import TextAreaComponent from "@components/content/TextAreaComponent";
import UploadButton from "@components/upload/UploadButton";
import UploadFileModal from "@components/upload/UploadFileModal";
import PdfViewerComponent from "./PdfViewerComponent";
import Alert from "@components/shared/Alert";

const MainWrapper: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  return (
    <>
      <Flex h="80vh" display="flex" flexWrap="wrap" alignItems="stretch">
        <ContentContainer hasRightBorder>
          <PdfViewerComponent />
        </ContentContainer>
        <ContentContainer>
          <TextAreaComponent />
        </ContentContainer>
      </Flex>
      <UploadButton {...{ onOpen }} />
      <UploadFileModal {...{ isOpen, onClose, setIsAlertOpen }} />
      {isAlertOpen && (
        <Alert isAlertOpen={isAlertOpen} setIsAlertOpen={setIsAlertOpen} />
      )}
    </>
  );
};

export default MainWrapper;
