import React, { useState } from "react";
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
import axios from "axios";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose(): void;
  setFileName(fileName): void;
  setDetectedText(text): void;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({
  onClose,
  isOpen,
  setFileName,
  setDetectedText,
}) => {
  const [inputValue, setInputValue] = useState("");

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

  const getDetectedTextFromResponse = (response) => {
    const { text } = response.data[0].fullTextAnnotation;
    setDetectedText(text);
  };

  const getDetection = () => {
    axios
      .get("http://localhost:3000/api/getOcr")
      .then((response) => {
        // handle success
        getDetectedTextFromResponse(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const onSave = () => {
    setFileName(inputValue);
    onClose();
    getDetection();
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
