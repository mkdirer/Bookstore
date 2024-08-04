import {
  BlankPanel,
  BlankTile,
  CommentsSection,
  DefaultButton,
  RatingField,
} from "../components";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import i18n from "../assets/locales/translate";
import { useEffect, useRef, useState } from "react";
import {
  Book,
  getAllRatingsByBook,
  getBookById,
  Review,
} from "../utils/fetch/fetch";
import { InfoPanelElement } from "../assets/styles/infoPanel";
import CommentBooksSearch from "../components/inputs/CommentBooksSearch";
import { RatingForm } from "../components/forms/RatingForm";
import { getBookCover } from "../utils/books/getBookCover";
import { getAllBookComments, createBookComment } from "../utils/fetch/fetch";

const BookInfo = () => {
  const { bookId } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isBookFetched = useRef(false);
  const isCoverFetched = useRef(false);
  const isRatingFetched = useRef(false);
  const [bookInfo, setBookInfo] = useState<Book>();
  const [bookCover, setBookCover] = useState<string>();
  const [ratings, setRatings] = useState<Review[]>();

  const getAvgRating = () => {
    if (ratings) {
      return ratings.reduce((a, b) => a + b.rating, 0) / ratings.length;
    }
  };

  useEffect(() => {
    if (!isBookFetched.current && bookId) {
      getBookById(parseInt(bookId))
        .then((book) => setBookInfo(book as Book))
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    const fetchCover = async () => {
      if (bookInfo) {
        await getBookCover(bookInfo.isbn)
          .then((cover) => {
            setBookCover(cover);
          })
          .catch((err) => console.log(err));
      }
    };

    if (!isCoverFetched.current && bookInfo) {
      fetchCover();
      isCoverFetched.current = true;
    }
  }, [bookInfo]);

  useEffect(() => {
    if (!isRatingFetched.current && bookId) {
      getAllRatingsByBook(parseInt(bookId))
        .then((ratingsList) => setRatings(ratingsList))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <BlankTile>
      <BlankPanel
        sx={{
          minWidth: "600px",
          width: "1200px",
          p: 3,
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Box
            sx={{
              border: "2px solid black",
              borderRadius: "15px",
              p: 2,
            }}
          >
            <Box
              component="img"
              sx={{ height: 350, width: 300 }}
              alt={i18n.t("profile photo") || "profile photo"}
              src={bookCover}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "770px",
              border: "2px solid black",
              borderRadius: "15px",
              p: 5,
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Box sx={{ width: "80%"}}>
                  <Typography sx={{ fontSize: 32, fontWeight: "bold", mb: 4 }}>
                    {bookInfo?.title}
                  </Typography>
              </Box>
              <DefaultButton
                sx={{ width: "140px" }}
                label={i18n.t("add review") || "add review"}
                handleClick={handleOpen}
              />
              <RatingForm isOpen={open} onClose={handleClose} bookId={parseInt(bookId || "1")}/>
              <RatingForm isOpen={open} onClose={handleClose} bookId={Number(bookId)} />
            </Box>
            <Box display="flex" marginBottom={1}>
              <Typography
                sx={{
                  fontSize: "26px",
                  fontWeight: "bold",
                  ml: "30px",
                  mr: 3,
                }}
              >
                {i18n.t("rating") || "rating"}:
              </Typography>
              <RatingField
                ratingValue={getAvgRating() || 0}
                ratingsNumber={ratings?.length}
                rowDirection
              />
            </Box>
            <Box display="flex" marginBottom={1}>
              <InfoPanelElement fontSize="26px">
                {i18n.t("author") || "author"}:
              </InfoPanelElement>
              <InfoPanelElement fontSize="26px">
                {bookInfo?.author}
              </InfoPanelElement>
            </Box>
            <Box display="flex">
              <InfoPanelElement fontSize="26px">
                {i18n.t("year") || "year"}:
              </InfoPanelElement>
              <InfoPanelElement fontSize="26px">
                {bookInfo?.year}
              </InfoPanelElement>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            border: "2px solid black",
            borderRadius: "15px",
            p: 1,
            my: 2,
          }}
        >
          <CommentBooksSearch bookID = {Number(bookId)}/>
        </Box>
        <CommentsSection
          sendComment={createBookComment}
          importComment={getAllBookComments}
          commentContextId={bookId || "null"}
        />
      </BlankPanel>
    </BlankTile>
  );
};

export default BookInfo;