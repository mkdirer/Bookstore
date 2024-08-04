import React from "react";
import { Paper, SxProps, Theme } from "@mui/material";

/**
 * The props for the BlankTile component.
 * @typedef {object} PropsBlankTile
 * @property {React.ReactNode} children - The content to be displayed inside the blank tile.
 * @property {SxProps<Theme>} [sx] - The optional style props to be applied to the Paper component.
 */
interface PropsBlankTile {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * The BlankTile component is a styled Paper component used to display content inside.
 * @param {PropsBlankTile} props - The props for the component.
 * @returns {JSX.Element} - The rendered blank tile component.
 */
const BlankTile: React.FC<PropsBlankTile> = ({
  children,
  sx,
}: PropsBlankTile): JSX.Element => {
  return (
    <Paper
      sx={[
        {
          backgroundColor: "rgba(217, 217, 217, 0.35)",
          m: 1,
          py: 2,
          px: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Paper>
  );
};

export type { PropsBlankTile };
export { BlankTile };
