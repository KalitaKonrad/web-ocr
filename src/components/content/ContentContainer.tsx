import React from "react";
import { Flex, Text } from "@chakra-ui/react";

interface ContentContainerProps {
  hasRightBorder?: boolean;
}

const ContentContainer: React.FC<ContentContainerProps> = (props) => {
  return (
    <Flex
      direction="column"
      flex={1}
      minWidth="13em"
      borderBottomWidth={1}
      borderRightWidth={props.hasRightBorder ? 1 : 0}
      borderColor="red.200"
    >
      {props.children}
    </Flex>
  );
};

export default ContentContainer;
