import { useState } from "react";
import {Button, Box, Tooltip} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { FormWrapper } from "./FormWrapper";
import i18n from "i18next";

/**
 * @typedef {object} PropsOpenFormButton
 * @property {React.ReactNode} children - The content to be displayed inside inner modal.
 */
interface PropsOpenFormButton {
  children: React.ReactNode;
}

/**
 * The OpenFormButton component is a button that when clicked, opens a form inside a modal.
 * @param {PropsOpenFormButton} props - The props for the component.
 * @returns {JSX.Element} - The rendered button that opens component FormWrapper with given children
 */
const OpenFormButton: React.FC<PropsOpenFormButton> = ({
  children,
}: PropsOpenFormButton): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{ borderRadius: "50%", border: "3px solid black" }}
      position="fixed"
      right="5%"
      zIndex={99}
      bottom="5%"
      color="black"
      alignItems="center"
    >
      <Tooltip title={i18n.t("add") || "add"}>
            <Button
            onClick={handleOpen}
            sx={{
              backgroundColor: "background.paper",
              borderRadius: "50%",
              width: "64px",
              height: "64px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              "&:hover": {
                backgroundColor: "background.default",
              },
            }}
          >
            <AddIcon />
          </Button>
      </Tooltip>
      <FormWrapper isOpen={open} onClose={handleClose}>
        {children}
      </FormWrapper>
    </Box>
  );
};

export type { PropsOpenFormButton };
export { OpenFormButton };
