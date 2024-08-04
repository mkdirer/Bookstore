import React from "react";
import Button from "@mui/material/Button";
import { SxProps, Theme, Typography } from "@mui/material";

/**
 * The props for the DefualtButton component.
 * @typedef {object} PropsDefualtButton
 * @property {string} label - The label to be displayed on the button.
 * @property {(text: string) => void} handleClick - Callback to the click event function handler.
 * @property {boolean} error - Logical check if error occured.
 * @property {SxProps<Theme>} [sx] - The optional style props to be applied to the Paper component.
 */
interface PropsDefualtButton {
  label: string;
  handleClick: (text: string) => void;
  error?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * The DefaultButton component is a styled MaterialUI Button component in defualt configuration.
 * @param {PropsDefualtButton} props - The props for the component.
 * @returns {JSX.Element} - The rendered button component.
 */
const DefaultButton: React.FC<PropsDefualtButton> = ({
  label,
  handleClick,
  error,
  sx,
}: PropsDefualtButton): JSX.Element => {
  // const {label, handleClick, error, sx} = props;

  return (
    <Button
      variant="contained"
      color={error ? "error" : "primary"}
      sx={[
        {
          color: "white",
          height: 38,
          width: 105,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      onClick={() => handleClick(label)}
    >
      <Typography variant="body1">{label}</Typography>
    </Button>
  );
};

export type { PropsDefualtButton };
export { DefaultButton };
