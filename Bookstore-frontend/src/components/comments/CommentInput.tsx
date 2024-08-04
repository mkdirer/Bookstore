import { useState } from "react";
import { TextField, Box } from "@mui/material";
import i18n from "../../assets/locales/translate";
import { DefaultButton } from "../";
import { Comment } from "../../utils/fetch/fetch";
import { isLoggedIn } from "../../utils/session";

interface PropsCommentInput {
  sendComment: (content: Comment) => void;
  commentContextId: string;
}

/**
 * Returns a styled CommentInput component.
 * @returns {JSX.Element} - The rendered CommentInput component.
 */
const CommentInput: React.FC<PropsCommentInput> = ({
  commentContextId,
  sendComment,
}: PropsCommentInput): JSX.Element => {
  const [commentText, setCommentText] = useState("");

  const handleCommentTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = () => {
    console.log( "parseInt(commentContextId)" )
    console.log( parseInt(commentContextId) )
    if (isLoggedIn() === false) {
      alert("Log in first");
    } else if (commentText.trim() === "") {
      alert("Empty comment");
    } else {

      let newComment: Comment = {
        userId: parseInt(localStorage.getItem("userID") || "1"),
        sourceId: parseInt(commentContextId),
        comment: commentText,
      };
      sendComment(newComment);
      setCommentText("");
    }
    // localStorage.getItem("sessionData").userID
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      sx={{ mb: 3 }}
    >
      <Box width="100%">
        <TextField
          variant="outlined"
          placeholder={i18n.t("write comment") || "..."}
          fullWidth
          multiline
          minRows={2}
          maxRows={4}
          value={commentText}
          onChange={handleCommentTextChange}
        />
      </Box>

      <Box sx={{ mr: 2, mt: 1 }}>
        <DefaultButton
          label={i18n.t("add comment")}
          handleClick={handleSubmit}
        />
      </Box>
    </Box>
  );
};

export { CommentInput };
