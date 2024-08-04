import * as React from "react";
import {SxProps, Theme, Typography} from "@mui/material";
import {BlankPanel} from "../index";

interface FormPanelProps {
    title: string;
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

const FormPanel: React.FC<FormPanelProps> = ({title, children, sx}: FormPanelProps):
    JSX.Element => {
    return (
        <BlankPanel sx={[
            {
                backgroundColor: "lightgray",
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            },
            ...(Array.isArray(sx) ? sx : [sx]),
        ]}>
            <Typography sx={{fontWeight: "bold", fontSize: 22}}>{title}</Typography>
            {children}
        </BlankPanel>
    );
}

export { FormPanel };
  