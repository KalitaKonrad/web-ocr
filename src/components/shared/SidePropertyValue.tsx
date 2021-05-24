import React from "react";
import { Text } from "@chakra-ui/react";

interface SidePropertyValueProps {
  text: string;
}

const SidePropertyValue: React.FC<SidePropertyValueProps> = ({ text }) => (
  <Text align="center" marginBottom={4}>
    {text}
  </Text>
);

export default SidePropertyValue;
