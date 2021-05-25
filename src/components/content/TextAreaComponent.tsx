import React, { useCallback, useContext } from "react";
import { Box, Textarea } from "@chakra-ui/react";
import { useStore } from "../../store/useStore";
import { AppContext } from "../../appContext/appContext";

const TextAreaComponent: React.FC = () => {
  const detectionEditsArray = useStore(
    useCallback((state) => state.detectionEditsArray, []),
  );

  const changeDetectionEdit = useStore(
    useCallback((state) => state.changeDetectionEdit, []),
  );

  const { selectedPage } = useContext(AppContext);
  const textAreaValue = detectionEditsArray[selectedPage];

  const handleChange = (event) => {
    changeDetectionEdit(selectedPage, event.target.value);
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
        value={textAreaValue}
        onChange={handleChange}
      />
    </Box>
  );
};

export default TextAreaComponent;
