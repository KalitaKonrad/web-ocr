import React from "react";
import { Text } from "@chakra-ui/react";

interface SidePropertyValueProps {
  text: string;
}

const SidePropertyValue: React.FC<SidePropertyValueProps> = ({ text }) => (
  <Text align="center" marginBottom={3}>
    {text}
  </Text>
);

export default SidePropertyValue;
