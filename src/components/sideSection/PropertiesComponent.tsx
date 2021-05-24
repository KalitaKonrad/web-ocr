import React from "react";
import { Flex } from "@chakra-ui/react";

interface PropertiesProps {}

const PropertiesComponent: React.FC<PropertiesProps> = () => {
  return (
    <Flex
      maxW="90%"
      flexDirection="column"
      alignItems="center"
      flex={1}
      overflowY="scroll"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    ></Flex>
  );
};

export default PropertiesComponent;
