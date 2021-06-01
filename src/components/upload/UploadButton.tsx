import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { useStore } from "../../store/useStore";

interface UploadButtonProps {
  onOpen(): void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onOpen }) => {
  const isDetectionLoading = useStore((state) => state.isDetectionLoading);

  return (
    <Box
      marginTop={4}
      display={"flex"}
      justifyContent="center"
      alignItems="center"
    >
      <Button
        w={400}
        isLoading={isDetectionLoading}
        loadingText="Dodawanie"
        colorScheme="red"
        variant="outline"
        borderRadius={24}
        onClick={onOpen}
        spinnerPlacement="start"
      >
        Dodaj pliki
      </Button>
    </Box>
  );
};

export default UploadButton;
