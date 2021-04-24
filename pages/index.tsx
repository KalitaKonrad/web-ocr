import React from "react";
import { Flex } from "@chakra-ui/react";

import SideContainer from "@components/sideSection/SideContainer";
import ContentContainer from "@components/content/ContentContainer";
import UploadButton from "@components/UploadButton";

const Home: React.FC = () => {
  return (
    <Flex h="100%" justifyContent="space-between">
      <SideContainer />
      <Flex direction={"column"} h="100%" w="70%">
        <Flex h="80%">
          <ContentContainer />
          <ContentContainer />
        </Flex>
        <UploadButton />
      </Flex>
      <SideContainer />
    </Flex>
  );
};

export default Home;
