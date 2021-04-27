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
      bgColor="red.100"
      alignItems="center"
      borderColor="red.200"
      borderLeftWidth={hasLeftBorder ? 1 : 0}
      borderRightWidth={hasRightBorder ? 1 : 0}
    >
      {children}
    </Flex>
  );
};

export default SideContainer;
