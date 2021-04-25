import React from "react";
import { Flex } from "@chakra-ui/react";

import SideContainer from "@components/sideSection/SideContainer";
import ContentContainer from "@components/content/ContentContainer";
import UploadButton from "@components/UploadButton";
import TextAreaComponent from "@components/content/TextAreaComponent";
import SideTitleComponent from "@components/shared/SideTitleComponent";

const Home: React.FC = () => {
  const renderLeftSide = () => (
    <SideContainer>
      <SideTitleComponent title="Podgląd" />
    </SideContainer>
  );

  const renderRightSide = () => (
    <SideContainer>
      <SideTitleComponent title="Właściwości" />
    </SideContainer>
  );

  const renderMainContent = () => (
    <>
      <Flex h="80%">
        <ContentContainer />
        <ContentContainer>
          <TextAreaComponent />
        </ContentContainer>
      </Flex>
      <UploadButton />
    </>
  );

  return (
    <Flex h="100%" justifyContent="space-between">
      {renderLeftSide()}
      <Flex direction={"column"} h="100%" w="70%">
        {renderMainContent()}
      </Flex>
      {renderRightSide()}
    </Flex>
  );
};

export default Home;
