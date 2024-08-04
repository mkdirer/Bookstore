import { Modal, Box, Typography } from "@mui/material";
import { BlankPanel } from "../boxes/BlankPanel";
import ErrorIcon from "@mui/icons-material/Error";
import { DefaultButton } from "../buttons/DefaultButton";

/**
 * @typedef {object} ErrorModalProps
 * @property {boolean} isOpen - A boolean value indicating whether the modal should be open or closed.
 * @property {function} onClose - A callback function that will be called when the modal is closed.
 * @property {string} errorMessage - An error message displayed by the modal.
 */
interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
}

/**
 * The ErrorModal component displays a modal with the message error.
 * It can be opened/closed using the isOpen prop and onClose callback function.
 * @param {ErrorModalProps} props - The props for the component.
 * @returns {JSX.Element} - The rendered ErrorModal component.
 */
const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  errorMessage,
}: ErrorModalProps): JSX.Element => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div>
        <BlankPanel
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            paddingX={2}
          >
            <ErrorIcon fontSize="large" color="error" />
            <Typography id="modal-modal-title" variant="h5" sx={{ my: 2 }}>
              {errorMessage}
            </Typography>
            <DefaultButton label="ok" handleClick={onClose} />
          </Box>
        </BlankPanel>
      </div>
    </Modal>
  );
};

export type { ErrorModalProps };
export { ErrorModal };
