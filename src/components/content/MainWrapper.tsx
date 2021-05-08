import React from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import ContentContainer from "@components/content/ContentContainer";
import TextAreaComponent from "@components/content/TextAreaComponent";
import UploadButton from "@components/UploadButton";
import UploadFileModal from "@components/UploadFileModal";

const MainWrapper: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex h="80%">
        <ContentContainer hasRightBorder />
        <ContentContainer>
          <TextAreaComponent />
        </ContentContainer>
      </Flex>
      <UploadButton onOpen={onOpen} />
      <UploadFileModal {...{ isOpen, onClose }} />
    </>
  );
};

export default MainWrapper;
