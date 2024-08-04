import { BlankTile } from "../";
import i18n from "../../assets/locales/translate";
import {Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {WelcomePanelCell} from "..";
import Library from '../../assets/images/icons/blackIcons/library.png';
import Rating from '../../assets/images/icons/blackIcons/rating.png';
import Books from '../../assets/images/icons/blackIcons/books.png';
import Chat from '../../assets/images/icons/blackIcons/chat.png';
import {LogInForm} from "../forms/LogInForm";

/**
 * The WelcomePanel component displays a welcome page.
 * @returns {JSX.Element} - The rendered WelcomePanel.
 */
const WelcomePanel: React.FC = (): JSX.Element => {
    return (
            <>
                <BlankTile sx={{display: "block", color: "white"}} >
                    <h1>{i18n.t('welcome header') || 'welcome header'}</h1>
                    <Typography sx={{ width: 1000, mb: 2, fontSize: 19 }}>
                        {i18n.t('welcome text') || 'welcome text'}
                    </Typography>
                    <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box marginTop={2.5}>
                            <WelcomePanelCell
                                title={i18n.t('discover title') || 'discover title'}
                                iconPath={Library}
                                text={i18n.t('discover text') || 'discover text'}
                            />
                            <WelcomePanelCell
                                title={i18n.t('rate title') || 'rate title'}
                                iconPath={Rating}
                                text={i18n.t('rate text') || 'rate text'}
                            />
                            <WelcomePanelCell
                                title={i18n.t('exchange title') || 'exchange title'}
                                iconPath={Books}
                                text={i18n.t('exchange text') || 'exchange text'}
                            />
                            <WelcomePanelCell
                                title={i18n.t('discuss title') || 'discuss title'}
                                iconPath={Chat}
                                text={i18n.t('discuss text') || 'discuss text'}
                            />
                        </Box>
                        <LogInForm />
                    </Stack>
                </BlankTile>
            </>
        );
}

export {WelcomePanel};