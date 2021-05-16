import React, { useContext, useEffect, useState } from "react";
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
import { useDetectionQuery } from "../../services/useDetectionQuery";
import FileInput from "./FileInput";
import { AppContext } from "src/appContext/appContext";
import axios from "axios";
import { useStore } from "src/store/useStore";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose(): void;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({
  onClose,
  isOpen,
}) => {
  const { file, setFile, selectedPage } = useContext(AppContext);
  const { error, data, isSuccess, refetch } = useDetectionQuery(file?.name);
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const changeDetectionEdit = useStore((state) => state.changeDetectionEdit);

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
      changeDetectionEdit(
        selectedPage,
        data[selectedPage - 1]?.fullTextAnnotation.text,
      );
    }
  }, [selectedPage, data]);

  const renderModalBody = () => (
    <ModalBody pb={6}>
      {<FileInput setFile={setSelectedFile} file={selectedFile} />}
    </ModalBody>
  );

  const onCloseModal = () => {
    onClose();
  };

  const uploadLocalPdf = async (localFile) => {
    const formData = new FormData();
    formData.append("file", localFile);
    axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const assignDataToStore = () => {
    for (let i = 0; i < data?.length; i++) {
      changeDetectionEdit(i, data[i].fullTextAnnotation.text);
    }
  };

  const onSave = () => {
    setFile(selectedFile);
    // setDetectedText("");
    uploadLocalPdf(selectedFile);
    assignDataToStore();
    onClose();
    console.log("HOHOHOHOHOOHOHOHOHOOHOH ++++++=");
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Prześlij plik</ModalHeader>
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
