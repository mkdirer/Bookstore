import {BlankPanel, DefaultButton} from "../";
import {useState} from "react";
import i18n from "../../assets/locales/translate";
import {Stack, Typography} from "@mui/material";
import {NotificationTile} from "../";
import bookImg from '../../assets/images/book.jpg'
import {getNotifications} from "../../utils/getNotifications";
import {viewAllHandler} from "../../utils/viewAllHandler";

/**
 * The UserNotificationsPanel component displays a BlancPanel with user's notifications.
 * @returns {JSX.Element} - The rendered UserNotificationsPanel.
 */
const UserNotificationsPanel: React.FC = ()
: JSX.Element =>{
    const [notificationsList, setNotificationsList] = useState(getNotifications(3));

    return (
        <BlankPanel sx={{ width: 485, borderRadius: 4 }}>
            <Typography variant="h5" align="left" sx={{ mx:3, mb: 1, fontWeight: "bold" }}>
                {i18n.t('notifications') || 'notifications'}
            </Typography>
            <Stack sx={{ height: "80%"}}>
                {notificationsList.map( notification => (
                    <NotificationTile
                        key={notification.key}
                        notificationType={notification.type}
                        bookLink={notification?.bookLink || ''}
                        userLink={notification?.userLink || ''}
                        bookCover={bookImg}
                        bookName={notification.bookName}
                        userName={notification?.userName}
                    />
                ))}
            </Stack>
            <DefaultButton sx={{mt: 2, width: 210}} label={i18n.t('viewAll') || 'viewAll'} handleClick={()=>viewAllHandler("view all")}/>
        </BlankPanel>
    );
}

export {UserNotificationsPanel};