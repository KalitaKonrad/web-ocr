import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useDetectionQuery } from "../services/useDetectionQuery";
import FileInput from "./FileInput";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose(): void;
  file: File;
  setFile(file): void;
  setDetectedText(text): void;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({
  onClose,
  isOpen,
  setFile,
  setDetectedText,
  file,
  setIsAlertOpen,
}) => {
  const { error, data, isSuccess, refetch } = useDetectionQuery(file?.name);

  const [selectedFile, setSelectedFile] = useState<File>(null);

  useEffect(() => {
    if (file?.name) {
      refetch();
    }
  }, [file]);

  useEffect(() => {
    if (error) {
      return;
    }
    if (isSuccess) {
      setDetectedText(data[0]?.fullTextAnnotation.text);
    }
  }, [data]);

  const renderModalBody = () => (
    <ModalBody pb={6}>
      <Text fontSize="sm">
        Twój plik powinien być zapisany w Cloud Storage w zasobniku
        web-ocr-storage. Przykładowa nazwa pliku "lorem-ipsum.pdf".
      </Text>

      {<FileInput setFile={setSelectedFile} file={selectedFile} />}
    </ModalBody>
  );

  const onCloseModal = () => {
    onClose();
  };

  const onSave = () => {
    setFile(selectedFile);
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
