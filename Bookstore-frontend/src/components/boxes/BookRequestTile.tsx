import Paper from "@mui/material/Paper";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import i18n from "../../assets/locales/translate";
import imagePath from "../../assets/images/book.jpg";
import { DefaultButton } from "../";
import {
  acceptHandler,
  rejectHandler,
} from "../../utils/bookRequestButtonsHandler";

/**
 * @typedef {object} PropsBookRequestTile
 * @property {string} user - User's name.
 * @property {string} title - Book's title.
 * @property {string} imgPath -
 */
interface PropsBookRequestTile {
  user: string;
  title: string;
  imgPath: string;
}

/**
 * Returns a styled Paper component consisting of multiple Boxes.
 * @param {PropsBookRequestTile} props - Props for the component.
 * @returns {JSX.Element} - The rendred BookRequestTile component.
 */
const BookRequestTile: React.FC<PropsBookRequestTile> = ({
  user,
  imgPath,
  title,
}: PropsBookRequestTile): JSX.Element => {
  // const {user, imgPath, title} = props;
  return (
    <Paper
      sx={{
        height: 67,
        width: 900,
        border: "2px solid black",
        px: 4,
        py: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Stack direction="column" sx={{ textAlign: "left" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography sx={{ fontSize: 20 }}>
            {i18n.t("user") || "user"}
          </Typography>
          <Typography
            sx={{ fontSize: 20, color: "green", fontWeight: "medium" }}
          >
            {user}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography sx={{ fontSize: 20 }}>
            {i18n.t("book") || "book"}
          </Typography>
          <Typography
            sx={{ fontSize: 20, color: "green", fontWeight: "medium" }}
          >
            {title}
          </Typography>
        </Box>
      </Stack>
      <Box
        component="img"
        sx={{ height: 70, width: 70 }}
        alt={i18n.t("book icon") || "book icon"}
        src={imagePath}
      />
      <Box sx={{ display: "flex", gap: 3, my: 1.5 }}>
        <DefaultButton
          label={i18n.t("accept") || "accept"}
          handleClick={() => acceptHandler("accept")}
        />
        <DefaultButton
          label={i18n.t("reject") || "reject"}
          handleClick={() => rejectHandler("reject")}
          error
        />
      </Box>
    </Paper>
  );
};

export type { PropsBookRequestTile };
export { BookRequestTile };
