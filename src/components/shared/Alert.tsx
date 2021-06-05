import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";

interface AlertProps {
  isAlertOpen: boolean;
  setIsAlertOpen(arg): void;
  message?: string;
}

const Alert: React.FC<AlertProps> = ({
  message,
  setIsAlertOpen,
  isAlertOpen,
}) => {
  const cancelRef = React.useRef();
  const onClose = () => setIsAlertOpen(false);

  return (
    <AlertDialog
      closeOnOverlayClick={false}
      isOpen={isAlertOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Wystąpił błąd
          </AlertDialogHeader>

          <AlertDialogBody>
            {message
              ? message
              : "Spróbuj ponownie. Upewnij się że dodajesz plik PDF"}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button backgroundColor="red.200" onClick={onClose} ml={3}>
              Zamknij
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
