import React from "react";
import { Flex } from "@chakra-ui/react";

import SideContainer from "@components/sideSection/SideContainer";

const Home: React.FC = () => {
  return (
    <Flex h="100%">
      <SideContainer />
    </Flex>
  );
};

export default Home;
