import React from "react";
import { Text } from "@chakra-ui/react";

interface SidePropertyValueProps {
  text: string;
  marginBottom?: number;
}

const SidePropertyValue: React.FC<SidePropertyValueProps> = ({
  text,
  marginBottom = 3,
}) => (
  <Text align="center" marginBottom={marginBottom}>
    {text}
  </Text>
);

export default SidePropertyValue;
