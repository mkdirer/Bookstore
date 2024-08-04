import {Stack, Typography} from "@mui/material";
import i18n from "../../assets/locales/translate";
import Box from "@mui/material/Box";

/**
 * The props for the WelcomePanelCell component.
 * @typedef {object} PropsWelcomePanelCell
 * @property {string} title - WelcomePage title
 * @property {string} iconPath - path to icon that will be displayed 
 * @property {string} text - text that will be displayed on WelcomePage
 */
interface PropsWelcomePanelCell{
    title: string,
    iconPath: string,
    text: string,
}

/**
 * Returns a styled WelcomePanelCell component.
 * @param {PropsWelcomePanelCell} props - Props for the component.
 * @returns {JSX.Element} - The rendered PropsWelcomePanelCell component.
 */
const WelcomePanelCell: React.FC<PropsWelcomePanelCell> = ({title, iconPath, text}: PropsWelcomePanelCell):
JSX.Element => {
    // const {title, iconPath, text} = props;

    return (
          <Stack
              direction="row"
              sx={{
                  width: 430,
                  border: "2px solid black",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                  px: 3,
                  m: 1
              }}>
              <Box
                  component='img'
                  sx={{ height: 50, width: 50}}
                  alt={i18n.t('book icon') || 'book icon'}
                  src={iconPath}
              />
              <Typography sx={{ mx: 3, my: 1.5, fontWeight: "bold", fontSize: 18 }}>{title}</Typography>
              <Typography sx={{ width: 260 }}>{text}</Typography>
          </Stack>
    );
}

export type {PropsWelcomePanelCell}
export {WelcomePanelCell}