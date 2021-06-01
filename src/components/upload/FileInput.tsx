import { Box, Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileInputProps {
  setFile: React.Dispatch<File>;
  file: File;
  loading: boolean;
}

const MAX_FILE_SIZE = 5_242_880; // 5 MB

const FileInput: React.FC<FileInputProps> = ({ setFile, file, loading }) => {
  const [fileError, setFileError] = useState("");

  const onDrop = useCallback(([file]) => {
    if (file?.size > MAX_FILE_SIZE) {
      setFileError(
        `Za duży plik, musi ważyć poniżej ${Math.floor(
          MAX_FILE_SIZE / (1024 * 1024),
        )} MB`,
      );
      return;
    }

    setFile(file);
    setFileError("");
  }, []);

  const onFileRemove = () => cleanUpModal();

  const {
    getRootProps,
    isDragActive,
    isDragAccept,
    getInputProps,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "application/pdf",
  });

  const cleanUpModal = () => {
    setFile(null);
    setFileError("");
  };

  const onSubmit = (e) => {
    console.log("submit");
  };

  const renderSpaceToUploadFile = () => (
    <Box height="100%">
      <Box
        {...getRootProps({
          isDragActive,
          isDragAccept,
          isDragReject,
        })}
        height="100%"
        _hover={{ cursor: "pointer" }}
      >
        <Input placeholder="Nazwa pliku" {...getInputProps()} size="sm" />
        <Box
          height="100%"
          style={{
            background: isDragActive ? "#ddd" : "#eee",
          }}
        >
          <Box
            style={{ color: isDragReject && "red" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            {!isDragActive
              ? "Przeciągnij tutaj plik PDF"
              : isDragReject
              ? "Możesz dodać tylko pliki PDF"
              : "Upuść plik PDF"}
          </Box>
        </Box>
      </Box>
      {fileError && <Text color="red.400">{fileError}</Text>}
    </Box>
  );

  const renderUploadedFile = () => (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box borderRadius={5} padding={2}>
        <Button
          _hover={{
            backgroundColor: "red.200",
            border: "1px solid red.300",
            cursor: "pointer",
          }}
          onClick={onFileRemove}
          disabled={loading}
        >
          Plik: {file.name}
        </Button>
      </Box>
    </Flex>
  );

  return (
    <Box height={200}>
      <form
        method="POST"
        onSubmit={(e) => onSubmit(e)}
        style={{ height: "100%" }}
        encType="multipart/form-data"
      >
        <FormControl marginTop={7} height="100%">
          {!file ? renderSpaceToUploadFile() : renderUploadedFile()}
        </FormControl>
      </form>
    </Box>
  );
};

export default FileInput;
