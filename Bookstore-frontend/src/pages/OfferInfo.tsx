import {
  BlankPanel,
  BlankTile,
  CommentsSection,
  DefaultButton,
  FormWrapper,
  RatingField,
} from "../components";
import { useParams } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import i18n from "../assets/locales/translate";
import { InfoPanelElement } from "../assets/styles/infoPanel";
import { useEffect, useRef, useState } from "react";
import {
  Advertisement,
  User,
  getBookById,
  getAdvertisementById,
  getUserById,
} from "../utils/fetch/fetch";
import { AllBookInfo } from "../components/inputs/TableBooksSearch";
import { OfferOperationForm } from "../components/forms/OfferOperationForm";
import { saveHandler } from "../utils/offerFormButtonsHandler";
import { getAllOfferComments, createOfferComment } from "../utils/fetch/fetch";
import { getBookCover } from "../utils/books/getBookCover";

/**
 * The OfferInfo component displays page with info about single offer .
 * @returns {JSX.Element} - The rendered OfferInfo component.
 */

const OfferInfo = () => {
  const { offerId } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isOffersListFetched = useRef(false);
  const isBookFetched = useRef(false);
  const isUserFetched = useRef(false);
  const isCoverFetched = useRef(false);

  const [bookCover, setBookCover] = useState<string>();
  const [offerInfo, setOfferInfo] = useState<Advertisement>();
  const [offeredBook, setOfferedBook] = useState<AllBookInfo>();
  const [offerAuthor, setOfferAuthor] = useState<User>();

  useEffect(() => {
    if (!isOffersListFetched.current) {
      getAdvertisementById(Number(offerId))
        .then((offer) => setOfferInfo(offer as Advertisement))
        .catch((err) => console.log(err));
    }
  }, [offerId]);

  useEffect(() => {
    if (!isBookFetched.current && offerInfo) {
      getBookById(offerInfo.bookId)
        .then((book) => setOfferedBook(book as unknown as AllBookInfo))
        .catch((err) => console.log(err));
    }
  }, [offerInfo]);

  useEffect(() => {
    if (!isUserFetched.current && offerInfo) {
      getUserById(offerInfo.userId)
        .then((author) => setOfferAuthor(author as User))
        .catch((err) => console.log(err));
    }
  }, [offerInfo]);

  useEffect(() => {
    const fetchCover = async () => {
      if (offeredBook) {
        await getBookCover("no_cover") //To fix later
          .then((cover) => {
            setBookCover(cover);
          })
          .catch((err) => console.log(err));
      }
    };

    if (!isCoverFetched.current && offeredBook) {
      fetchCover();
      isCoverFetched.current = true;
    }
  }, [offeredBook]);

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
          <Stack>
            <Box
              sx={{
                border: "2px solid black",
                borderRadius: "15px",
                p: 2,
                mb: 1,
              }}
            >
              <Box
                component="img"
                sx={{ height: 350, width: 300 }}
                alt={i18n.t("book cover") || "book cover"}
                src={bookCover}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "300px",
                border: "2px solid black",
                borderRadius: "15px",
                p: 3,
              }}
            >
              <Box display="flex">
                <InfoPanelElement>{i18n.t("user") || "user"}</InfoPanelElement>
                <InfoPanelElement>{offerAuthor?.login}</InfoPanelElement>
              </Box>
              <Box display="flex">
                <InfoPanelElement>
                  {i18n.t("email") || "email"}:
                </InfoPanelElement>
                <InfoPanelElement sx={{fontSize: 15}}>{offerAuthor?.email}</InfoPanelElement>
              </Box>
              <Box display="flex">
                <InfoPanelElement>
                  {i18n.t("phone") || "phone"}:
                </InfoPanelElement>
                <InfoPanelElement>{offerAuthor?.phone}</InfoPanelElement>
              </Box>
            </Box>
          </Stack>
          <Box
            sx={{
              width: "756px",
              height: "508px",
              border: "2px solid black",
              borderRadius: "15px",
              p: 4,
              mb: 1,
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <InfoPanelElement fontSize="34px">
                {offeredBook?.title}
              </InfoPanelElement>
              <DefaultButton
                sx={{ ml: 5, mt: "10px" }}
                label="Edit"
                handleClick={handleOpen}
              />
              <FormWrapper isOpen={open} onClose={handleClose}>
                <OfferOperationForm
                  formTitle={i18n.t("edit offer") || "edit offer"}
                  saveHandler={saveHandler}
                  commentValue={offerInfo?.message}
                  typeValue={offerInfo?.type}
                />
              </FormWrapper>
            </Box>
            <Box display="flex" marginTop={3}>
              <Typography
                sx={{
                  fontSize: "21px",
                  fontWeight: "bold",
                  ml: "30px",
                  mr: 3,
                }}
              >
                {i18n.t("rate") || "rating"}:
              </Typography>
              <RatingField
                ratingValue={offeredBook?.rating}
                ratingsNumber={offeredBook?.votes}
                rowDirection
              />
            </Box>
            <Box display="flex" marginY={2}>
              <InfoPanelElement>{i18n.t("year") || "year"}:</InfoPanelElement>
              <InfoPanelElement>{offeredBook?.year}</InfoPanelElement>
            </Box>
            <Box display="flex">
              <InfoPanelElement>
                {i18n.t("author") || "author"}:
              </InfoPanelElement>
              <InfoPanelElement>{offeredBook?.author}</InfoPanelElement>
            </Box>
            <Box display="flex" marginY={2}>
              <InfoPanelElement>
                {i18n.t("posted") || "posted"}:
              </InfoPanelElement>
              <InfoPanelElement>{offerInfo?.dateAdded}</InfoPanelElement>
            </Box>
            {offerInfo?.type === "sale" && (
              <Box display="flex" marginY={2}>
                <InfoPanelElement>
                  {i18n.t("price") || "price"}
                </InfoPanelElement>
                <InfoPanelElement>{""}</InfoPanelElement>
              </Box>
            )}
            <Box display="flex" marginY={2}>
              <InfoPanelElement>
                {i18n.t("offer message") || "offer message"}
              </InfoPanelElement>
              <InfoPanelElement>{offerInfo?.message}</InfoPanelElement>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            border: "2px solid black",
            borderRadius: "15px",
            p: 1,
            mt: 2,
          }}
        >
          <CommentsSection
            sendComment={createOfferComment}
            importComment={getAllOfferComments}
            commentContextId={offerId || "null"}
          />
        </Box>
      </BlankPanel>
    </BlankTile>
  );
};

export default OfferInfo;