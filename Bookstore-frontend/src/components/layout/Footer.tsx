import { Box } from '@mui/material';
import {LanguageButtons} from '../';

/**
 * The Footer component displays a footer with button to change site language.
 * @returns {JSX.Element} - The rendered Footer component.
 */
const Footer: React.FC = () : JSX.Element => {
  
  return (
    <Box sx={{
        px: "5%",
        bgcolor: 'primary.main', 
        color: 'secondary.main', 
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center", 
        flexDirection: "row"}} >
      <LanguageButtons/>
    </Box>
  );
};

export {Footer};
