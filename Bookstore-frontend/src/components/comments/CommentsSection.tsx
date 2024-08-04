import { useState, useEffect, useRef } from "react";
import { Button, Box, Typography } from "@mui/material";
import i18n from "../../assets/locales/translate";
import { CommentInput } from "./CommentInput";
import { UserComment } from "./UserComment";
import { Comment } from "../../utils/fetch/fetch";

interface PropsCommentsSection {
  sendComment: (content: Comment) => void;
  importComment: (id: number) => Promise<Comment[]>;
  commentContextId: string;
}

/**
 * Returns a styled CommentsSection component, where you can browse comments.
 * @returns {JSX.Element} The rendered CommentsSection component.
 */
const CommentsSection: React.FC<PropsCommentsSection> = ({
  commentContextId,
  sendComment,
  importComment,
}: PropsCommentsSection): JSX.Element => {
  const [lastCommentNumber, setLastCommentNumber] = useState( 1 );
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [isMore, setIsMore] = useState(true);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    console.log("fetching comment");

    const fetchComment = async () => {
      await importComment(parseInt(commentContextId))
        .then((obj) => {
          setAllComments(obj);
        })
        .catch((err) => console.log(err));
    };

    if ( isFetched === false) {
      fetchComment();
      setIsFetched(true);
    }
  }, [commentContextId, importComment, isFetched]);

  const handleShowMore = () => {
    // const newValue = getComments(lastCommentNumber + 5);

    // setAllComments(newValue);
    // if (newValue.length < lastCommentNumber + 5) {
    //   setIsMore(false);
    // }
    setLastCommentNumber(allComments.length);
  };

  const handleSendComment = (content: Comment) => {
    sendComment(content)
    setIsFetched( false) ;
  } 

  return (
    <Box width="100%">
      <Typography variant="h5" align="left" sx={{ mx: 3, mb: 1 }}>
        {" "}
        {i18n.t("comments")}{" "}
      </Typography>

      <CommentInput sendComment={handleSendComment}
      commentContextId={commentContextId}
      />

      {
      (allComments || []).map((com: Comment) => (
        <UserComment
          key={com.sourceId +"_" + com.id}
          id={com.id}
          userId={com.userId}
          sourceId={parseInt(commentContextId)}
          comment={com.comment}
          lname={com.lname}
          fname={com.fname}
          dateAdded={com.dateAdded}
          avatar={com.avatar}
        />
      ))}

      <Button
        color="primary"
        onClick={() => {
          handleShowMore();
        }}
        variant="text"
        disabled={!isMore}
      >
        <Typography variant="caption"> {i18n.t("show more")} </Typography>
      </Button>
    </Box>
  );
};

export { CommentsSection };
