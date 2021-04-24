import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const SideContainer: React.FC = () => {
  return (
    <Flex direction="column" h="100%" w={200} bgColor={"cyan.100"}>
      <Text>HELLO WORLD</Text>
    </Flex>
  );
};

export default SideContainer;
