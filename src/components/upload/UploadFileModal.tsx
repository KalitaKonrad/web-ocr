import React, { useCallback, useContext, useState } from "react";
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
import { ResponseObj, useStore } from "src/store/useStore";
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

  const setResponses = useStore(useCallback((state) => state.setResponses, []));
  const responsesState = useStore((state) => state.responses);
  console.log("responsesState", responsesState);

  const assignDataToStore = (output) => {
    if (output.length === 0) {
      return;
    }

    // set state for each page
    output.forEach((file) => {
      const { responses } = JSON.parse(file);

      console.log("responsesState", responsesState);
      console.log("responses stet", responses);

      responses.forEach((res) => {
        changeDetectionEdit(
          res.context.pageNumber,
          res.fullTextAnnotation.text,
        );
        setPagesData(res.context.pageNumber, res.fullTextAnnotation.pages[0]);
        setResponses(res.context.pageNumber - 1, res);
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
        message={"Błąd detekcji, spróbuj ponownie"}
        isAlertOpen={isDetectionError}
        setIsAlertOpen={setIsDetectionError}
      />
    );
  }

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
