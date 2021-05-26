import React, { useContext, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
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
  const changeDetectionEdit = useStore((state) => state.changeDetectionEdit);
  const [loading, setLoading] = useState(false);

  const renderModalBody = () => (
    <ModalBody pb={6}>{<FileInput setFile={setFile} file={file} />}</ModalBody>
  );

  const onCloseModal = () => {
    onClose();
  };

  const uploadLocalPdf = async (localFile) => {
    const formData = new FormData();
    formData.append("file", localFile);
    return axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const assignDataToStore = (data) => {
    for (let i = 0; i < data?.length; i++) {
      changeDetectionEdit(i + 1, data[i].fullTextAnnotation.text);
    }
  };

  const onSave = async () => {
    // setDetectedText("");
    setLoading(true);
    await uploadLocalPdf(file);
    const { data } = await axios.get(
      `http://localhost:3000/api/getOcr/${file?.name}`,
    );
    // assignDataToStore(data);
    console.log("data", data);
    setLoading(false);
    onClose();
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Prześlij plik</ModalHeader>
        {renderModalBody()}
        <ModalFooter>
          <Button
            backgroundColor="red.200"
            mr={3}
            onClick={onSave}
            isLoading={loading}
          >
            Wyślij
          </Button>
          <Button onClick={onCloseModal} disabled={loading}>
            Anuluj
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadFileModal;
