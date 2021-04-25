import React from "react";
import { Flex } from "@chakra-ui/react";

const SideContainer: React.FC = (props) => {
  return (
    <Flex
      direction="column"
      h="100%"
      w="15%"
      bgColor={"red.100"}
      alignItems={"center"}
    >
      {props.children}
    </Flex>
  );
};

export default SideContainer;
