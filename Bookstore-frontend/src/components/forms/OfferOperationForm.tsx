import * as React from "react";
import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SearchBar } from "../inputs/SearchBar";
import { FormInput } from "./FormInput";
import i18n from "i18next";
import { DefaultButton } from "../buttons/DefaultButton";
import { FormPanel } from "../boxes/FormPanel";
import { createAdvertisement, Advertisement } from "../../utils/fetch/fetch";
import { isLoggedIn } from "../../utils/session";
/**
 * @typedef {object} OfferOperationFormProps
 * @property formTitle - A header title of the offer.
 * @property {function} saveHandler - A function saving form data.
 * @property {string} commentValue - A comment added to the book offer.
 * @property {string} typeValue - An offer type.
 * @property {number} priceValue - A book price, if the offer type is 'sale'.
 * @property {string} exchangeBookTitle - A title of the book for exchange, if the offer type is 'exchange'.
 */
interface OfferOperationFormProps {
  formTitle: string;
  // TODO Zmienić typ funkcji po zdefiniowaniu funkcji fetch dodawania/edycji oferty
  saveHandler: (label: string) => void;
  commentValue?: string;
  typeValue?: string;
  priceValue?: number;
  exchangeBookTitle?: string;
}

/**
 * The OfferOperationForm component for editing or adding a book offer.
 * @param {OfferOperationFormProps} props - The props for the component.
 * @returns {JSX.Element} - The rendered OfferOperationForm component.
 */
const OfferOperationForm: React.FC<OfferOperationFormProps> = ({
  formTitle,
  saveHandler,
  commentValue,
  typeValue,
  priceValue,
  exchangeBookTitle,
}: OfferOperationFormProps): JSX.Element => {
  const [comment, setComment] = useState(commentValue ?? "");
  const [price, setPrice] = useState(priceValue?.toString ?? undefined);
  const [book, setBook] = useState(1);
  const [exchangeBook, setExchangeBook] = useState(exchangeBookTitle ?? "");
  const [type, setType] = useState(typeValue ?? "");

  const sendOffer = () => {
    if (!isLoggedIn()) {
      alert("Log in first");
    } else {
      const sessionDataString = localStorage.getItem("sessionData");
      const sessionData = sessionDataString
        ? JSON.parse(sessionDataString)
        : null;
      const userID = sessionData ? sessionData.userID : null;
      if (userID === null) {
        alert("Session Error");
      } else {
        let typeInt: number = type === "sale" ?  1 : 
                              type === "exchange" ? 2 : 3;
          // sale == 1
          // exchange == 2
          // give free == 3

        let out: Advertisement = {
          bookId: book,
          dateAdded: "_",
          dateFinished: "_",
          id: 1,
          message: comment,
          receiverId: 1,
          status: 1,
          type: typeInt,
          userId: parseInt(userID),
        };
        createAdvertisement(out);
        console.log("Offer Sent");
      }
    }
  };

  return (
    <FormPanel title={formTitle} sx={{ width: 400, mx: "auto", mt: 4 }}>
      <FormControl variant="filled" sx={{ my: 2, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">
          {i18n.t("offer type") || "offer type"}
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <MenuItem value="sale">{i18n.t("sale") || "sale"}</MenuItem>
          <MenuItem value="exchange">
            {i18n.t("exchange") || "exchange"}
          </MenuItem>
          <MenuItem value="free">{i18n.t("for free") || "for free"}</MenuItem>
        </Select>
      </FormControl>

      <TextField
        type="number"
        sx={{ width: "90%", m: 1 }}
        label={i18n.t("BookID") || "BookID"}
        value={book}
        onChange={(event) => setBook(parseInt(event.target.value, 10))}
      />

      <FormInput
        sx={{ width: "90%" }}
        label={i18n.t("comment") || "comment"}
        value={comment}
        onChange={(value) => setComment(value)}
      />
      {type === "sale" && (
        <>
          <FormInput
            sx={{ width: "95%" }}
            label={i18n.t("price") || "price"}
            value={price || ""}
            onChange={(value) => setPrice(value)}
          />
        </>
      )}
      {type === "exchange" && (
        <Box sx={{ width: "95%", ml: 1 }}>
          <Typography sx={{ bgcolor: "lightgray", border: "1 solid black" }}>
            {exchangeBook}
          </Typography>
          <Typography variant="subtitle1" fontWeight={500}>
            {i18n.t("bookExchange") || "book to exchange"}
          </Typography>
          <Box
            sx={{
              p: 1,
              width: "90%",
              border: "2px solid ",
              borderColor: "primary.main",
              backgroundColor: "lightgray",
              borderRadius: 2,
            }}
          >
            <SearchBar sx={{ width: "100%" }} />
          </Box>
        </Box>
      )}
      <Stack
        direction="row"
        sx={{ display: "flex", justifyContent: "right", mt: 3 }}
      >
        <DefaultButton
          label={i18n.t("save") || "save button"}
          handleClick={() => sendOffer()}
          sx={{ px: 2 }}
        />
      </Stack>
    </FormPanel>
  );
};

export type { OfferOperationFormProps };
export { OfferOperationForm };
