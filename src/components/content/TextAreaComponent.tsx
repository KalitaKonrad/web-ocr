import React from "react";
import { Box, Textarea } from "@chakra-ui/react";

interface TextAreaProps {
  detectedText: string;
}

const TextAreaComponent: React.FC<TextAreaProps> = ({ detectedText }) => {
  return (
    <Box my={5}>
      <Textarea
        borderWidth={0}
        placeholder="Dodaj plik aby rozpocząć rozpoznawanie tekstu"
        resize="none"
        size="lg"
        variant="outline"
        isDisabled={detectedText === ""}
        value={detectedText}
      />
    </Box>
  );
};

export default TextAreaComponent;
