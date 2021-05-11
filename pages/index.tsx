import React from "react";
import { Flex } from "@chakra-ui/react";

import SideContainer from "@components/sideSection/SideContainer";
import SideTitleComponent from "@components/shared/SideTitleComponent";
import PreviewList from "@components/sideSection/PreviewList";
import MainWrapper from "@components/content/MainWrapper";
import { AppContext } from "../src/appContext/appContext";
import { useState } from "react";

const Home: React.FC = () => {
  const [file, setFile] = useState<File>(null);

  const renderLeftSide = () => (
    <SideContainer hasRightBorder>
      <SideTitleComponent title="Podgląd" />
      <PreviewList />
    </SideContainer>
  );

  const renderRightSide = () => (
    <SideContainer hasLeftBorder>
      <SideTitleComponent title="Właściwości" />
    </SideContainer>
  );

  const renderMainContent = () => <MainWrapper />;

  return (
    <AppContext.Provider value={{ file, setFile }}>
      <Flex h="100%" justifyContent="space-between">
        {renderLeftSide()}
        <Flex direction={"column"} h="100%" w="70%">
          {renderMainContent()}
        </Flex>
        {renderRightSide()}
      </Flex>
    </AppContext.Provider>
  );
};

export default Home;
