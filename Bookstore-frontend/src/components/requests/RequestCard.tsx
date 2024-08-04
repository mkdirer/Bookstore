import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import i18n from "../../assets/locales/translate";
import { FormWrapper, AddBookForm } from "..";

/**
 * The props for the RequestCard component.
 * @typedef {object} PropsRequestCard
 * @property {string} title - title of book user want to be added
 * @property {string} user_id - id of the requesting user
 * @property {string} add_date - date of request submit
 * @property {string} message - message from user
 */
interface PropsRequestCard {
  title: string;
  user_id: string;
  add_date: string;
  message: string;
}

/**
 * Returns a card of request submited by user.
 * @param {PropsRequestCard} props - Props for the component
 * @returns {JSX.Element} - The rendered RequestCard component.
 */
const RequestCard: React.FC<PropsRequestCard> = ({
  title,
  user_id,
  add_date,
  message,
}: PropsRequestCard): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card
      sx={{
        border: "2px solid #1A3B29",
        p: 1,
        m: 1,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "2px solid #1A3B29",
        }}
      >
        <Typography variant="h5" sx={{ mx: 5 }}>
          {title}
        </Typography>

        <Box sx={{ display: "flex", gap: 3, mx: 5, alignItems: "center" }}>
          <Typography>
            {i18n.t("requested by") || "requested by"}
            {" " + user_id + ", "}
            {i18n.t("on day") || "on"}
            {" " + add_date}
          </Typography>
          <IconButton onClick={handleOpen} sx={{ cursor: "pointer" }}>
            <ThumbsUpDownIcon />
          </IconButton>
        </Box>
        <FormWrapper isOpen={open} onClose={handleClose}>
          <AddBookForm
          title="Harry Potter"
          onAccept={handleOpen}
          onReject={handleClose}
          />
        </FormWrapper>
      </CardContent>

      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "center", height: "10px" }}
      >
        <IconButton
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            py: 1,
            px: 4,
            height: "16px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Typography paragraph>{message}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export type { PropsRequestCard };
export { RequestCard };
