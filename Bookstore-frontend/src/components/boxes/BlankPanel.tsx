import * as React from "react";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material";

/**
 * @typedef {object} PropsBlankPanel
 * @property {React.ReactNode} children - The content to be displayed inside the component.
 * @property {SxProps<Theme>} sx - The optional style props to be applied to the Paper component.
 */
interface PropsBlankPanel {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * Returns a styled blank Paper Box component.
 * @param {PropsBlankPanel} props - Props for the component.
 * @returns {JSX.Element} - The rendred BlankPanel component.
 */
const BlankPanel: React.FC<PropsBlankPanel> = ({
  children,
  sx,
}: PropsBlankPanel): JSX.Element => {
  return (
    <Box
      sx={[
        {
          m: "5px",
          p: "16px",
          borderRadius: 8,
          backgroundColor: "#EDEDED",
          border: "2px solid #000000",
          display: "inline-block",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

export type { PropsBlankPanel };
export { BlankPanel };
