import {Stack, Avatar, Box, IconButton, Tooltip} from "@mui/material";
import i18n from "../../assets/locales/translate";
import LogoutIcon from "@mui/icons-material/Logout";
import BooksIcon from "../../assets/images/icons/goldIcons/book.png";
import { handleLogOut } from "../../utils/session";
import {useEffect, useRef, useState} from "react";
import {getProfile} from "../../utils/fetch/fetch";

/**
 * A component that displays user information in a box
 * @param {string} username - The user's name
 * @param {string} userID - The user's ID
 * @param {string} imgPath - The path to the user's profile picture
 * @param {boolean} NotificationsActive - Whether or not the user has any notifications
 */
interface PropsUserCard {
  username?: string;
  userID?: string;
  imgPath?: string;
  NotificationsActive: boolean;
}
/**
 * UserCard component displays user's profile image and provides links to user's profile page,
 * notifications page, books page, and a logout button.
 * @param {string} username - User's username.
 * @param {string} userID - User's unique ID.
 * @param {string} imgPath - User's profile image path.
 * @param {boolean} NotificationsActive - Boolean value indicating if user has any active notifications.
 * @returns {JSX.Element} - UserCard component.
 */
const UserCard: React.FC<PropsUserCard> = ({
  username,
  userID,
  imgPath,
}: PropsUserCard): JSX.Element => {
  const [userId, setUserId] = useState(-1);
  const isProfileFetched = useRef(false);

  useEffect(() => {
    if (!isProfileFetched.current) {
      getProfile()
          .then((profile) =>
          {
            if(profile?.id) {
              setUserId(profile.id)
            }
          })
          .catch((err) => console.log(err));
    }
  }, []);

  return (
    <Box
      border={2}
      borderRadius={10}
      borderColor="secondary.main"
      sx={{ backgroundColor: "primary.main" }}
    >
      <Stack direction="row" spacing={1}>
        <Tooltip title={i18n.t("user profile") || "user profile"}>
          <IconButton href={`/user/${userId}`} sx={{ margin: 0, padding: 0 }}>
            <Avatar
              src={imgPath}
              sx={{ width: 56, height: 56, border: "2px solid #9D710D", p:"12px", backgroundColor: "gray" }}
              alt={i18n.t("user image") || "user image"}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title={i18n.t("user books") || "user books"}>
          <IconButton color="secondary" href="/books" sx={{ margin: 0 }}>
            <img
              src={BooksIcon}
              width="40"
              height="40"
              alt={i18n.t("user ratings") || "user ratings"}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title={i18n.t("logout") || "logout"}>
          <IconButton
            color="secondary"
            href="/"
            sx={{ margin: 0 }}
            onClick={() => handleLogOut()}
          >
            <LogoutIcon sx={{ width: 40, height: 40 }} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export type { PropsUserCard };
export { UserCard };
