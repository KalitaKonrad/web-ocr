import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const ContentContainer: React.FC = (props) => {
  return (
    <Flex direction="column" w="50%" borderWidth={1} borderColor={"red.200"}>
      {props.children}
    </Flex>
  );
};

export default ContentContainer;
