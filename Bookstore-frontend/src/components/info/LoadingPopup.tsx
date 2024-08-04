import i18n from "../../assets/locales/translate";
import {Box, CircularProgress, Typography} from "@mui/material";

/**
 * Returns a styled Loading Popup component.
 * @returns {JSX.Element} - The rendered LoadingPopup component.
 */
const LoadingPopup: React.FC = () : JSX.Element => {
    return (
        <>
            <Box>
                <CircularProgress size="8rem" sx={{ color:"white" }}/>
                <Typography sx={{ color:"white", mt: 2, fontSize: 24 }}>
                    {i18n.t('loading') || 'loading'}
                </Typography>
            </Box>
        </>
    );
}

export {LoadingPopup}