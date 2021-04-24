import React from "react";
import { Button, Box } from "@chakra-ui/react";

const UploadButton: React.FC = () => {
  return (
    <Box my={50} display={"flex"} justifyContent={"center"}>
      <Button
        w={400}
        isLoading={false}
        loadingText="Dodawanie"
        colorScheme="red"
        variant="outline"
      >
        Dodaj pliki
      </Button>
    </Box>
  );
};

export default UploadButton;
