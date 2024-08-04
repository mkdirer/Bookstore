import React from "react";
import { Link, Box, Typography, Rating } from "@mui/material";
import i18n from "../../assets/locales/translate";

/**
 * @typedef {object} PropsNotificationTile
 * @property {string} bookLink - Link to the book.
 * @property {string} bookCover - Cover of the book
 * @property {string} bookName - Name of the book.
 * @property {number} ratingValue - Average rating of the book.
 */
interface PropsRatingTile {
  bookLink?: string;
  bookCover?: string;
  bookName?: string;
  ratingValue?: number;
}

/**
 * Returns a styled Paper Box component containing rating of the book.
 * @param {PropsBookRequestTile} props - Props for the component.
 * @returns {JSX.Element} - The rendred RatingTile component.
 */
const RatingTile: React.FC<PropsRatingTile> = ({
  bookLink,
  bookCover,
  bookName,
  ratingValue,
}: PropsRatingTile): JSX.Element => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ border: 2, borderColor: "primary.main", p: 1, m: 0.5 }}
    >
      <Typography
        variant="subtitle1"
        sx={{ mx: 2, maxWidth: "88%", fontSize: 21 }}
        align="left"
      >
        <Box sx={{ mb: 1, mr: 1 }}>
          {i18n.t("book") || "book"}
          <Typography variant="button">
            <Link href={bookLink} underline="none" color="primary.light" fontSize={20}>
              {" " + bookName}{" "}
            </Link>
          </Typography>
        </Box>
        <Box display="flex">
          {i18n.t("yourRating")}
          <Rating sx={{ mx: 2, mt: 0.7 }} defaultValue={ratingValue} readOnly />
        </Box>
      </Typography>

      <img
        src={bookCover}
        alt={i18n.t("mentioned book") || "book"}
        width="80"
        height="80"
      />
    </Box>
  );
};

export type { PropsRatingTile };
export { RatingTile };
