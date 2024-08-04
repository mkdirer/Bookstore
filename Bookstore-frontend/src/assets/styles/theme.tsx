import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1A3B29',
      light: '#22AA88',
    },
    secondary: {
      main: '#9D710D',
    },
    background: {
      default: '#c3c3c3',
      paper: '#e0e0e0',
    },
    divider: '#9D710D',
  },
});
