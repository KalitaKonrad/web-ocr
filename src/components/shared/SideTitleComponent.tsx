import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface SideTitleProps {
  title: string;
}

const SideTitleComponent: React.FC<SideTitleProps> = ({ title }) => (
  <Box m={5}>
    <Text fontWeight={500} fontSize={"xl"}>
      {title}
    </Text>
  </Box>
);

export default SideTitleComponent;
