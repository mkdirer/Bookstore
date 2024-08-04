import { useState } from "react";
import { Box, FilledInput, IconButton, InputAdornment, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


interface PropsFormPassword {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const FormPassword: React.FC<PropsFormPassword> =({ label, value, onChange }: PropsFormPassword)
: JSX.Element => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
    <Box marginY={2}>
      <Typography variant="subtitle1" fontWeight={500} marginBottom={1}>
        {label}
      </Typography>
      <FilledInput
        type={showPassword ? 'text' : 'password'}
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
        }
      />
    </Box>
  );
}


export type {PropsFormPassword};
export {FormPassword};