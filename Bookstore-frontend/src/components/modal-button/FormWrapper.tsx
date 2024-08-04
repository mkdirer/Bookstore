import { Modal, Box } from '@mui/material';
/**
 * @typedef {object} PropsFormWrapper
 * @property {React.ReactNode} children - The content to be displayed inside the component.
 * @property {boolean} isOpen - A boolean value indicating whether the modal should be open or closed.
 * @property {function} onClose - A callback function that will be called when the modal is closed.
 */
interface PropsFormWrapper {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: ()=> void;
}

/**
 * The FormWrapper component displays a modal with its content centered in the middle of the modal.
 * It can be opened/closed using the isOpen prop and onClose callback function.
 * @param {PropsFormWrapper} props - The props for the component.
 * @returns {JSX.Element} - The rendered FormWrapper component (modal with {childern}).
 */
const FormWrapper: React.FC<PropsFormWrapper> = ( {children, isOpen, onClose}:  PropsFormWrapper)
: JSX.Element => {
  return (
      <Modal
        open={isOpen}
        onClose={onClose}
      >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }}>
            {children}
        </Box>
      </Modal>
  );
};

export type {PropsFormWrapper};
export {FormWrapper};
