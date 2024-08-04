import * as React from "react";
import {Box, SxProps, TextField, Theme, Typography} from "@mui/material";

/**
 * @typedef {object} FormInputProps
 * @property {string} label - Label of the form.
 * @property {string} value - Value of the form.
 * @property {function} onChange - A callback function that will be called on change event.
 */
interface FormInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    helperText?: string;
    sx?: SxProps<Theme>;
}

/**
 * The FormInput component displays a form input.
 * @param {FormInputProps} - The props for the component.
 * @returns {JSX.Element} - The rendered FormInput component.
 */
const FormInput: React.FC<FormInputProps> = ({
                                                 label,
                                                 value,
                                                 onChange,
                                                 error,
                                                 helperText,
                                                 sx
                                             }: FormInputProps): JSX.Element => {
    return (
        <Box marginY={2} sx={[...(Array.isArray(sx) ? sx : [sx])]}>
            <Typography variant="subtitle1" fontWeight={500} marginBottom={1}>
                {label}
            </Typography>
            <TextField
                variant="filled"
                fullWidth
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                error={error}
                helperText={helperText}
            />
        </Box>
    );
}

export type {FormInputProps};
export {FormInput};
