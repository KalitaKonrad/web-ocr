import React from "react";
import { Box, Textarea } from "@chakra-ui/react";

const TextAreaComponent: React.FC = (props) => {
  return (
    <Box my={5}>
      <Textarea
        borderWidth={0}
        placeholder="Dodaj plik aby rozpocząć rozpoznawanie tekstu"
        resize="none"
        size="lg"
        variant="outline"
        isDisabled
      />
    </Box>
  );
};

export default TextAreaComponent;
