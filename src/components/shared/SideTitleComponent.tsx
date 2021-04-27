import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface SideTitleProps {
  title: string;
}

const SideTitleComponent: React.FC<SideTitleProps> = ({ title }) => (
  <Box m={5}>
    <Text colorScheme="red">{title}</Text>
  </Box>
);

export default SideTitleComponent;
