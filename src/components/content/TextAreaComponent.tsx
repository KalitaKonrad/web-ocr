import React, { useEffect, useState } from "react";
import { Box, Textarea } from "@chakra-ui/react";

interface TextAreaProps {
  detectedText: string;
}

const TextAreaComponent: React.FC<TextAreaProps> = ({ detectedText }) => {
  const [textAreaValue, setTextAreaValue] = useState(detectedText);

  useEffect(() => {
    setTextAreaValue(detectedText);
  }, [detectedText]);

  const handleChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  return (
    <Box mt={5} flex={1}>
      <Textarea
        height="100%"
        borderWidth={0}
        placeholder="Dodaj plik aby rozpocząć rozpoznawanie tekstu"
        resize="none"
        size="lg"
        variant="outline"
        isDisabled={detectedText === ""}
        value={textAreaValue}
        onChange={handleChange}
      />
    </Box>
  );
};

export default TextAreaComponent;
