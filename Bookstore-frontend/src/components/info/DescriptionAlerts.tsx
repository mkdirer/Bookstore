import { useState, useEffect } from "react";
import Alert, { AlertColor } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";

/*
  example use:
  <DescriptionAlerts  severityProp="success" 
                      messageProp={i18n.t('book updated') || 'book updated'} />
*/

/**
 * The props for the DescriptionAlerts component.
 * @typedef {object} PropsDescriptionAlerts
 * @property {AlertColor} severityProp - 
 * @property {string} messageProp - message that will be displayed in alert
 * @property {number} duration - time that message will be displayed (in miliseconds)
 */
interface PropsDescriptionAlerts {
  severityProp?: AlertColor;
  messageProp?: string;
  duration?: number;
}

/**
 * Returns a styled Description Alert component.
 * @param {PropsDescriptionAlerts} props - Props for the component.
 * @returns {JSX.Element} - The rendered DescriptionAlerts component.
 */
const DescriptionAlerts: React.FC<PropsDescriptionAlerts> = ({
  severityProp,
  messageProp,
  duration = 5000,
}: PropsDescriptionAlerts):
JSX.Element => {
  const [severity, setSeverity] = useState<AlertColor>(severityProp || "error");
  const [message, setMessage] = useState<string>(messageProp || "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSeverity(severityProp || "error");
  }, [severityProp]);

  useEffect(() => {
    setMessage(messageProp || "");
  }, [messageProp]);

  useEffect(() => {
    setOpen(true);
    const timeoutId = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(timeoutId);
  }, [severityProp, messageProp, duration]);

  return (
    <Stack
      sx={{
        position: "fixed",
        top: "80px",
        right: "10px",
        zIndex: 1,
        width: "20%",
        marginTop: "50px",
        flexDirection: "column",
      }}
      spacing={2}
    >
      <Collapse in={open}>
        {severity && (
          <Alert severity={severity}>
            <AlertTitle>
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </AlertTitle>
            {message}
          </Alert>
        )}
      </Collapse>
    </Stack>
  );
}

export type {PropsDescriptionAlerts}
export {DescriptionAlerts}