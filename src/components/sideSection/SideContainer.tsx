import React from "react";
import { Flex } from "@chakra-ui/react";

interface SideContainerProps {
  hasLeftBorder?: boolean;
  hasRightBorder?: boolean;
}

const SideContainer: React.FC<SideContainerProps> = ({
  children,
  hasLeftBorder = false,
  hasRightBorder = false,
}) => {
  return (
    <Flex
      direction="column"
      h="100%"
      w="15%"
      minW="9em"
      maxW="12em"
      bgGradient="linear(to-b, red.200, red.400)"
      alignItems="center"
      borderColor="red.400"
      borderLeftWidth={hasLeftBorder ? 1 : 0}
      borderRightWidth={hasRightBorder ? 1 : 0}
    >
      {children}
    </Flex>
  );
};

export default SideContainer;
