import React, { useState } from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import ContentContainer from "@components/content/ContentContainer";
import TextAreaComponent from "@components/content/TextAreaComponent";
import UploadButton from "@components/upload/UploadButton";
import UploadFileModal from "@components/upload/UploadFileModal";
import PdfViewerComponent from "./PdfViewerComponent";
import Alert from "@components/shared/Alert";
import DownloadButton from "@components/content/DownloadButton";

const MainWrapper: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  return (
    <Box height="100%">
      <Flex h="80vh" flexWrap="wrap" alignItems="stretch">
        <ContentContainer hasRightBorder>
          <PdfViewerComponent />
        </ContentContainer>
        <ContentContainer>
          <TextAreaComponent />
        </ContentContainer>
      </Flex>
      <Flex
        h="20vh"
        flex={1}
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
      >
        <UploadButton {...{ onOpen }} />
        <DownloadButton />
      </Flex>
      <UploadFileModal {...{ isOpen, onClose }} />
    </Box>
  );
};

export default MainWrapper;
