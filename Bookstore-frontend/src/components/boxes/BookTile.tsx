import Paper from "@mui/material/Paper";
import { Stack, Typography } from "@mui/material";
import i18n from "../../assets/locales/translate";
import Box from "@mui/material/Box";
import {RatingField} from '..';

import imagePath from "../../assets/images/book.jpg";

/**
 * @typedef {object} PropsBookTile
 * @property {string} imgPath - Path to book cover image.
 * @property {string} title - Title of the book.
 * @property {string} year - Year of publication of the book.
 * @property {string} author - Author of the book.
 * @property {number} ratingValue - Avarage rating of the book.
 * @property {number} ratingsNumber - Number of ratings of the book.
 */
interface PropsBookTile {
  imgPath: string;
  title: string;
  year: string;
  author: string;
  ratingValue: number;
  ratingsNumber: number;
}

/**
 * Returns a styled Paper component consisting of multiple Boxes that provides information for multiple book fields.
 * @param {PropsBookTile} props - Props for the component.
 * @returns {JSX.Element} - The rendred BookTile component.
 */
const BookTile: React.FC<PropsBookTile> = ({
  imgPath,
  title,
  year,
  author,
  ratingValue,
  ratingsNumber,
}: PropsBookTile): JSX.Element => {
  // const {imgPath, title, year, author, ratingValue, ratingsNumber} = props;

  return (
    <Paper
      sx={{
        height: 70,
        width: 1000,
        border: "1px solid black",
        px: 4,
        py: 3,
      }}
    >
      <Stack
        direction="row"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box
          component="img"
          sx={{ height: 70, width: 70 }}
          alt={i18n.t("book icon") || "book icon"}
          src={imgPath}
        />
        <Typography sx={{ mt: 2.5 }}>{title}</Typography>
        <RatingField ratingValue={ratingValue} ratingsNumber={ratingsNumber} />
        <Typography sx={{ mt: 2.5 }}>{year}</Typography>
        <Typography sx={{ mt: 2.5, mr: 2 }}>{author}</Typography>
      </Stack>
    </Paper>
  );
}

export type { PropsBookTile };
export { BookTile };
