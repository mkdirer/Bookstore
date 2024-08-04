import { FormWrapper } from "../modal-button/FormWrapper";
import i18n from "../../assets/locales/translate";
import { FormPanel } from "../boxes/FormPanel";
import { Box, Typography } from "@mui/material";
import { Rating } from "@mui/material";
import { useState } from "react";
import { FormInput } from "./FormInput";
import * as React from "react";
import { useRef } from "react";
import { DefaultButton } from "../buttons/DefaultButton";
import { Review, createReview } from "../../utils/fetch/fetch";
import { isLoggedIn } from "../../utils/session";

/**
 * @typedef {object} RatingFormProps
 * @property {boolean} isOpen - A boolean value indicating whether the modal should be open or closed.
 * @property {function} onClose - A callback function that will be called when the modal is closed.
 */
interface RatingFormProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: number;
}

/**
 * The RatingForm component enables user reviewing a book.
 * @param {RatingFormProps} props - The props for the component.
 * @returns {JSX.Element} - The rendered RatingForm component.
 */
const RatingForm: React.FC<RatingFormProps> = ({
  isOpen,
  onClose,
  bookId,
}: RatingFormProps): JSX.Element => {
  const [value, setValue] = useState<number | null>(0);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(-1);
  const isProfileFetched = useRef(false);
  const isUserFetched = useRef(false);

  const handlerSend = ()=>{
    if (isLoggedIn() === false) {
      alert("Log in first");
    } else if (comment.trim() === "") {
      alert("Empty comment");
    } else if (value === null) {
      alert("No rating");
    } else {

      let newReview: Review = {
        userId: parseInt(localStorage.getItem("userID") || "1"),
        bookId: bookId,
        dateAdded: "2023-06-10",
        rating: value,
        comment: comment,
      };
      console.log(newReview)
      createReview(newReview);
    }
  }

  return (
    <FormWrapper isOpen={isOpen} onClose={onClose}>
      <FormPanel
        title={i18n.t("rate book") || "rate book"}
        sx={{ width: 400, mx: "auto", mt: 4 }}
      >
        <Box display="flex" sx={{ width: "90%", mt: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mr: 2 }}>
            {i18n.t("yourRating") || "your rating"}
          </Typography>
          <Rating
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
        <FormInput
          sx={{ width: "90%" }}
          label={i18n.t("comment") || "comment"}
          value={comment}
          onChange={(value) => setComment(value)}
        />
        <Box display="flex" marginTop={2}>
          <DefaultButton
            sx={(theme) => ({ color: "error", mr: 3 })}
            label={i18n.t("cancel") || "cancel"}
            handleClick={onClose}
          />
          <DefaultButton
            sx={(theme) => ({ color: "primary" })}
            label={i18n.t("save") || "save"}
            handleClick={() => handlerSend() }
          />
        </Box>
      </FormPanel>
    </FormWrapper>
  );
};

export type { RatingFormProps };
export { RatingForm };
