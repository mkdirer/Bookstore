import { BlankPanel, DefaultButton } from "../";
import { useState } from "react";
import i18n from "../../assets/locales/translate";
import { Stack, Typography } from "@mui/material";
import { NotificationTile } from "../";
import bookImg from '../../assets/images/book.jpg';
import { getNotifications } from "../../utils/getNotifications";
import { viewAllHandler } from "../../utils/viewAllHandler";
import NotificationsSearchBar from "../inputs/NotificationsSearchBar";
import { NoDataMessage } from "..";

interface Notification {
  key: string;
  type: string;
  bookLink: string;
  userLink: string;
  bookCover: string;
  bookName: string;
  userName: string;
}

/**
 * The TableNotifications component displays a BlankPanel with user's notifications.
 * @returns {JSX.Element} - The rendered TableNotifications.
 */
const TableNotifications: React.FC = (): JSX.Element => {
  const [notificationsList, setNotificationsList] = useState<Notification[]>(getNotifications(3));

  const [selectedType, setSelectedType] = useState<'userName' | 'bookName' | ''>('');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (searchValue: string, searchType: 'userName' | 'bookName' | '') => {
    setSelectedType(searchType);
    setSearchValue(searchValue);
  };

  const filteredNotifications = notificationsList.filter((notification) => {
    const typeMatch = selectedType === '' || notification.type === selectedType;
    const searchValueMatch = notification.userName.toLowerCase().includes(searchValue.toLowerCase())
      || notification.bookName.toLowerCase().includes(searchValue.toLowerCase());
    return typeMatch && searchValueMatch;
  });

  return (
    <BlankPanel sx={{ width: '1050px', color: "black", borderRadius: 0, p: "6px"}}>
      <NotificationsSearchBar onSearch={handleSearch} />

      <BlankPanel sx={{ width: '990px', color: "black", borderRadius: 0, p: "6px", 
          border: "0px solid #000000"}}>

        <Stack sx={{ height: "80%" }}>
          {filteredNotifications.map(notification => (
            <NotificationTile
              key={notification.key}
              notificationType={notification.type}
              bookLink={notification?.bookLink  || ''}
              userLink={notification?.userLink  || ''}
              bookCover={bookImg}
            //   bookCover={notification.bookCover}
              bookName={notification.bookName}
              userName={notification?.userName}
            />
          ))}
          {filteredNotifications.length === 0 && <NoDataMessage />}
        </Stack>
      </BlankPanel>
    </BlankPanel>
  );
};

export { TableNotifications };
