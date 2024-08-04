import {
    AppBar,
    IconButton,
    ButtonGroup,
    Divider,
    Toolbar,
    Tooltip,
} from "@mui/material";
import { HeaderButton } from "../";
import { UserCard } from "../";
import MainLogo from "../../assets/images/icons/main_icon.png";
import i18n from "../../assets/locales/translate";
import {isLoggedIn, restoreSession, SessionData} from "../../utils/session";
import { loadAvatar } from "../../assets/avatars/loadAvatar";

/**
 * The Header component displays AppBar with menu, icon and UserCard.
 */
const Header: React.FC = (): JSX.Element => {
  const sessionData: SessionData | null = restoreSession();

  const getAvatarFromSession = (): string => {
    const sessionDataString = localStorage.getItem('sessionData');
    if (sessionDataString) {
      const sessionData = JSON.parse(sessionDataString);
      return sessionData.avatar || "none";
    }
    return "none";
  };

  const avatar = getAvatarFromSession()

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          mx: "5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <ButtonGroup
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Tooltip title={i18n.t("main page") || "main page"}>
              <IconButton color="secondary" href="/">
                <img src={MainLogo} width="120" height="90" alt="main page" />
              </IconButton>
          </Tooltip>
          <HeaderButton
            label={i18n.t("databse and ratings")}
            href="/database-and-ratings"
          />
          <HeaderButton label={i18n.t("exchange/sale offers")} href="/offers" />
          {sessionData?.isModerator ? (
            <HeaderButton label={i18n.t("moderator board")} href="/moderator" />
          ) : (
            <div />
          )}

        </ButtonGroup>
        { isLoggedIn() ? <UserCard NotificationsActive={false} imgPath={loadAvatar(avatar,"S")} /> : <></> }
      </Toolbar>
      <Divider sx={{ borderWidth: 3 }} />
    </AppBar>
  );
};

export { Header };
