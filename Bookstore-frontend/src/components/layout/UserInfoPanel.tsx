import {Paper, Stack, Typography} from "@mui/material";
import i18n from "../../assets/locales/translate";
import Box from "@mui/material/Box";
import {DefaultButton} from "../";
import {InfoPanelElement} from "../../assets/styles/infoPanel";
import {useState} from "react";
import EditUserInfoForm from "../forms/EditUserInfoForm";

interface PropsUserInfoPanel {
    name: string,
    surname: string;
    email: string;
    phoneNr: string;
    isOwnProfile?: boolean;
}

/**
 * The UserInfoPanel component displays info about user .
 * @param {PropsUserInfoPanel} props - The props for the component.
 * @returns {JSX.Element} - The rendered UserInfoPanel component.
 */
const UserInfoPanel: React.FC<PropsUserInfoPanel> = ({name, surname, email, phoneNr, isOwnProfile}: PropsUserInfoPanel)
    : JSX.Element => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Paper sx={{
            height: 250,
            width: 580,
            px: 5.5,
            py: 2,
            pt: 4,
            border: '2px solid black',
            borderRadius: 4,
            mr: 1,
            mb: 2
        }}>
            <Stack direction="row" sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography sx={{
                    fontSize: 27,
                    fontWeight: "bold",
                }}>
                    {i18n.t('user info') || 'user info'}
                </Typography>
                {isOwnProfile &&
                    <>
                        <DefaultButton
                            sx={(theme) => ({color: "#FFFFFF"})}
                            label={i18n.t('edit button') || 'edit button'}
                            handleClick={handleOpen}/>
                        <EditUserInfoForm isOpen={open} onClose={handleClose} firstName={name} lastName={surname}
                                          emailAddress={email} phoneNr={phoneNr}/>
                    </>
                }
            </Stack>
            <Stack direction="row" sx={{mt: 2}}>
                <Box>
                    <InfoPanelElement>{i18n.t('user name') || 'user name'}</InfoPanelElement>
                    <InfoPanelElement>{i18n.t('user surname') || 'user surname'}</InfoPanelElement>
                    <InfoPanelElement>{i18n.t('user email') || 'user email'}</InfoPanelElement>
                    <InfoPanelElement>{i18n.t('user phone') || 'user phone'}</InfoPanelElement>
                </Box>
                <Box sx={{ml: 2}}>
                    <InfoPanelElement>{name}</InfoPanelElement>
                    <InfoPanelElement>{surname}</InfoPanelElement>
                    <InfoPanelElement>{email}</InfoPanelElement>
                    <InfoPanelElement>{phoneNr}</InfoPanelElement>
                </Box>
            </Stack>
        </Paper>
    );
}

export type {PropsUserInfoPanel};
export {UserInfoPanel};