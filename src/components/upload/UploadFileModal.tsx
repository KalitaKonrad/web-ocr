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
import Alert from "@components/shared/Alert";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose(): void;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({
  onClose,
  isOpen,
}) => {
  const { file, setFile, setOcrCompleted } = useContext(AppContext);
  const changeDetectionEdit = useStore((state) => state.changeDetectionEdit);
  const setIsDetectionLoading = useStore(
    (state) => state.setIsDetectionLoading,
  );
  const detectionLoading = useStore((state) => state.isDetectionLoading);
  const setNumberOfPages = useStore((state) => state.setNumberOfPages);
  const setPagesData = useStore((state) => state.setPagesData);

  const [isDetectionError, setIsDetectionError] = useState(false);

  const renderModalBody = () => (
    <ModalBody pb={6}>
      {<FileInput setFile={setFile} file={file} loading={detectionLoading} />}
    </ModalBody>
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

  const assignDataToStore = (output) => {
    if (output.length === 0) {
      return;
    }

    // set state for each page
    output.forEach((file) => {
      const { responses } = JSON.parse(file);
      responses.forEach(({ fullTextAnnotation, context }) => {
        changeDetectionEdit(context.pageNumber, fullTextAnnotation.text);
        setPagesData(context.pageNumber, fullTextAnnotation.pages[0]);
      });
    });

    // compute total number of pages
    const lastFile = output[output.length - 1];
    const { responses } = JSON.parse(lastFile);
    const totalNumberOfPages =
      responses[responses.length - 1].context.pageNumber;

    setNumberOfPages(totalNumberOfPages);
  };

  const onSave = async () => {
    onClose();
    setIsDetectionLoading(true);
    await uploadLocalPdf(file);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/getOcr/${file?.name}`,
      );

      const isCompleted = data.latestResponse.done;

      if (isCompleted) {
        const { data } = await axios.get(
          `http://localhost:3000/api/fetchOcrData/${file?.name}`,
        );
        assignDataToStore(data);
      }

      setOcrCompleted(true);
      setIsDetectionLoading(false);
    } catch (error) {
      setIsDetectionError(true);
      setIsDetectionLoading(false);
    }
  };

  if (isDetectionError) {
    return (
      <Alert
        message={"B????d detekcji, spr??buj ponownie"}
        isAlertOpen={isDetectionError}
        setIsAlertOpen={setIsDetectionError}
      />
    );
  }

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Prze??lij plik</ModalHeader>
        {renderModalBody()}
        <ModalFooter>
          <Button
            backgroundColor="red.200"
            mr={3}
            onClick={onSave}
            disabled={!file}
            isLoading={detectionLoading}
          >
            Save
          </Button>
          <Button onClick={onCloseModal} disabled={detectionLoading}>
            Anuluj
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadFileModal;
