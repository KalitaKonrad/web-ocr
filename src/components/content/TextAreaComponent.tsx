import React from "react";
import { Textarea } from "@chakra-ui/react";

const TextAreaComponent: React.FC = (props) => {
  return (
    <Textarea
      borderWidth={0}
      placeholder="Dodaj plik aby rozpocząć rozpoznawanie tekstu"
      resize={"none"}
      size={"lg"}
      variant={"outline"}
      isDisabled
    />
  );
};

export default TextAreaComponent;
