import { Avatar, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Comment } from "../../utils/fetch/fetch";
import { loadAvatar, avatarList } from "../../assets/avatars/loadAvatar";
import { useMemo } from "react";

/**
 * The props for the UserComment component.
 * @typedef {object} Comment
 * @property {string} avatarUrl - URL to user's avatar
 * @property {string} username - Name of the user
 * @property {string} content - Commment's content
 * @property {string} dataOfPublish - Date of comment's publishment
 */
interface UserCommentProps {
  avatarUrl: string;
  username: string;
  content: string;
  dataOfPublish: string;
}

/**
 * Returns a component diplaying user comment.
 * @param {Comment} props - Props for the component
 * @returns {JSX.Element} - The rendered UserComment component.
 */
const UserComment: React.FC<Comment> = ({
  id,
  userId,
  sourceId,
  comment,
  fname,
  lname,
  dateAdded,
  avatar,
}: Comment): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      gap={3}
      sx={{ my: 0.5, px: 1.5, border: "1px solid black" }}
    >
      <Avatar
        src={loadAvatar(avatar || "none", "S")}
        alt={"user icon"}
        sx={{ my: 1 }}
      />
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="baseline"
          sx={{ gap: 1 }}
        >
          <Button onClick={() => navigate(`/user/${userId}`)}>
            <Typography variant="h6" component="span" color="primary">
              {fname + " " + lname}
            </Typography>
          </Button>

          <Typography variant="caption">{dateAdded}</Typography>
        </Box>
        <Typography variant="body1" component="p" align="left">
          {comment}
        </Typography>
      </Box>
    </Box>
  );
};

export type { UserCommentProps };
export { UserComment };
