import React from "react";
import { Button, Box } from "@chakra-ui/react";

interface UploadButtonProps {
  onOpen(): void;
  fileName: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onOpen, fileName }) => {
  return (
    <Box my={50} display={"flex"} justifyContent={"center"}>
      <Button
        w={400}
        isLoading={false}
        loadingText="Dodawanie"
        colorScheme="red"
        variant="outline"
        borderRadius={24}
        onClick={onOpen}
      >
        Dodaj pliki
      </Button>
    </Box>
  );
};

export default UploadButton;
