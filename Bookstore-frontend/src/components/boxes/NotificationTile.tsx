import React from "react";
import { Link, Box, Typography } from "@mui/material";
import i18n from "../../assets/locales/translate";

/**
 * @typedef {object} PropsNotificationTile
 * @property {string} notificationType -Type of the notification.
 * @property {string} bookLink - Link to the book.
 * @property {string} userLink - Link to the user.
 * @property {string} bookCover - Cover of the book.
 * @property {string} bookName - Name of the book.
 * @property {string} userName - Name of the user.
 */
interface PropsNotificationTile {
  notificationType: string;
  bookLink?: string;
  userLink?: string;
  bookCover?: string;
  bookName?: string;
  userName?: string;
}

/**
 * Returns a styled Paper Box component containing information of the notification.
 * @param {PropsNotificationTile} props - Props for the component.
 * @returns {JSX.Element} - The rendred NotificationTile component.
 */
const NotificationTile: React.FC<PropsNotificationTile> = ({
  notificationType,
  bookLink,
  userLink,
  bookCover,
  bookName,
  userName,
}: PropsNotificationTile): JSX.Element => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ border: 2, borderColor: "primary.main", p: 1, m: 0.5 }}
    >
      <Typography
        variant="subtitle1"
        sx={{ mx: 2, maxWidth: "88%" }}
        align="left"
      >
        {userName ? (
          <Typography variant="button">
            <Link href={userLink} underline="none" color="primary.light">
              {userName + " "}
            </Link>
          </Typography>
        ) : (
          (i18n.t("moderator") || "moderator") + " "
        )}
        {i18n.t(notificationType)}
        {bookName ? (
          <Typography variant="button">
            <Link href={bookLink} underline="none" color="primary.light">
              {" " + bookName}{" "}
            </Link>
          </Typography>
        ) : (
          ""
        )}
        {notificationType !== "mention" ? " " + i18n.t("toDatabase") : ""}
        {notificationType === "rejectBook"
          ? " " + i18n.t("inDatabase") + "."
          : "."}
      </Typography>

      {bookCover && (
        <Box sx={{ marginLeft: "auto" }}>
          <img
            src={bookCover}
            alt={i18n.t("mentioned book") || "book"}
            width="60"
            height="60"
          />
        </Box>
      )}
    </Box>
  );
};

export type { PropsNotificationTile };
export { NotificationTile };
