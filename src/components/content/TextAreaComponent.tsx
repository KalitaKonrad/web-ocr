import React, { useContext, useEffect, useState } from "react";
import { Box, Textarea } from "@chakra-ui/react";
import { useStore } from "../../store/useStore";
import { AppContext } from "../../appContext/appContext";

const TextAreaComponent: React.FC = () => {
  const detectionEditsArray = useStore((state) => state.detectionEditsArray);
  const changeDetectionEdit = useStore((state) => state.changeDetectionEdit);

  const { selectedPage } = useContext(AppContext);
  const [textAreaValue, setTextAreaValue] = useState(
    detectionEditsArray[selectedPage],
  );

  useEffect(() => {
    setTextAreaValue(detectionEditsArray[selectedPage]);
    console.log("=======>: ", detectionEditsArray[selectedPage]);
  }, [selectedPage, detectionEditsArray]);

  const handleChange = (event) => {
    // setTextAreaValue(event.target.value);
    changeDetectionEdit(selectedPage, event.target.value);
    console.log(event.target.value);
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
        isDisabled={detectionEditsArray[selectedPage] === ""}
        value={textAreaValue}
        onChange={handleChange}
      />
    </Box>
  );
};

export default TextAreaComponent;
