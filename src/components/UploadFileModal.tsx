import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useDetectionQuery } from "../services/useDetectionQuery";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose(): void;
  setFileName(fileName): void;
  setDetectedText(text): void;
  fileName: string;
  setIsAlertOpen(arg): void;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({
  onClose,
  isOpen,
  setFileName,
  setDetectedText,
  fileName,
  setIsAlertOpen,
}) => {
  const { isLoading, error, data, refetch, isFetched } = useDetectionQuery(
    fileName,
  );

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (fileName !== "") {
      getDetection();
    }
  }, [fileName]);

  useEffect(() => {
    if (error) {
      setIsAlertOpen(true);
      return;
    }
    if (isFetched) {
      setDetectedText(data[0]?.fullTextAnnotation.text);
    }
  }, [isFetched]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const renderInputForm = () => (
    <FormControl marginTop={7}>
      <Input
        placeholder="Nazwa pliku"
        value={inputValue}
        onChange={handleInputChange}
      />
    </FormControl>
  );

  const renderModalBody = () => (
    <ModalBody pb={6}>
      <Text fontSize="sm">
        Twój plik powinien być zapisany w Cloud Storage w zasobniku
        web-ocr-storage. Przykładowa nazwa pliku "lorem-ipsum.pdf".
      </Text>

      {renderInputForm()}
    </ModalBody>
  );

  const onCloseModal = () => {
    setInputValue("");
    onClose();
  };

  const getDetection = async () => {
    await refetch();
  };

  const onSave = () => {
    setFileName(inputValue);
    onClose();
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Podaj nazwę pliku</ModalHeader>
        {renderModalBody()}
        <ModalFooter>
          <Button backgroundColor="red.200" mr={3} onClick={onSave}>
            Save
          </Button>
          <Button onClick={onCloseModal}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadFileModal;
