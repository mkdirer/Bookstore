import * as React from 'react';
import NoDataIcon from '../../assets/images/icons/blackIcons/empty.png';
import { Typography, Box, useTheme } from '@mui/material';

/**
 * The props for the NoDataMessage component.
 * @typedef {object} PropsNoDataMessage
 * @property {string} message - message that will be displayed
 */
interface PropsNoDataMessage {
  message?: string;
}

/**
 * Returns a styled NoDataMessage component.
 * @param {PropsNoDataMessage} props - Props for the component.
 * @returns {JSX.Element} - The rendered NoDataMessage component.
 */
const NoDataMessage: React.FC<PropsNoDataMessage> = ({ message = "No more data to load" }: PropsNoDataMessage):
JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      fontFamily="Montserrat"
      fontStyle="normal"
      fontWeight={400}
      fontSize={60}
      lineHeight="150%"
      letterSpacing={0.15}
      color="#000"
    >
      <img
        src={NoDataIcon}
        alt="Empty Icon"
        style={{
          width: 'clamp(60px, 15vw, 120px)',
          height: 'clamp(60px, 15vw, 120px)',
          marginRight: theme.spacing(2),
        }}
      />
      <Typography variant="h5" component="h3" marginLeft={2}>
        {message}
      </Typography>
    </Box>
  );
}

export type {PropsNoDataMessage}
export {NoDataMessage}
