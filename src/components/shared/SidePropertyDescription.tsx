import React from "react";
import { Text } from "@chakra-ui/react";

interface SidePropertyDescriptionProps {
  text: string;
}

const SidePropertyDescription: React.FC<SidePropertyDescriptionProps> = ({
  text,
}) => (
  <Text align="center" fontWeight={500}>
    {text}
  </Text>
);

export default SidePropertyDescription;
